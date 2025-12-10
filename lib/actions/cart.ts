'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';

// Definicja typu CartItem z relacjami
type CartItemWithProductAndCategory = {
    id: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    cartId: number;
    productId: number;
    product: {
        id: number;
        code: string;
        name: string;
        type: string;
        description: string | null;
        price: number;
        amount: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: number;
        category: {
            id: number;
            name: string;
        };
    };
};

type CartWithItems = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    items: CartItemWithProductAndCategory[];
};

/**
 * Pobiera koszyk użytkownika wraz ze wszystkimi powiązanymi danymi.
 */
export async function getCartWithItems(userId: string): Promise<CartWithItems | null> {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: userId
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  }) as CartWithItems | null;

  return cart;
}

/**
 * Oblicza całkowitą wartość koszyka użytkownika.
 */
export async function getCartTotal(userId: string): Promise<number> {
  const cart = await getCartWithItems(userId);

  if (!cart) {
    return 0;
  }

  const total = cart.items.reduce((sum, item) => {
    const price = Number(item.product.price);
    return sum + (price * item.quantity);
  }, 0);

  return parseFloat(total.toFixed(2));
}

/**
 * Pobiera listę wszystkich użytkowników z liczbą produktów w ich koszykach.
 */
export async function getAllUsersWithCarts() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      cart: {
        select: {
          id: true,
          _count: {
            select: {
              items: true,
            },
          },
        },
      },
    },
    orderBy: {
      name: 'asc'
    }
  });

  return users.map(user => ({
    id: user.id,
    email: user.email,
    name: user.name,
    cartId: user.cart?.id || null,
    itemCount: user.cart ? user.cart._count.items : 0,
  }));
}

/**
 * Przenosi wszystkie produkty z koszyka jednego użytkownika do koszyka drugiego.
 */
export async function transferCart(fromUserId: string, toUserId: string) {
  if (fromUserId === toUserId) {
    throw new Error('Nie można przenieść koszyka do tego samego użytkownika.');
  }

  const fromCart = await prisma.cart.findUnique({
    where: { userId: fromUserId },
    include: { items: true },
  });

  if (!fromCart || fromCart.items.length === 0) {
    console.log(`Koszyk źródłowy (user: ${fromUserId}) jest pusty lub nie istnieje.`);
    revalidatePath('/basket');
    return;
  }

  let toCart = await prisma.cart.findUnique({
    where: { userId: toUserId },
    select: { id: true }
  });

  if (!toCart) {
    toCart = await prisma.cart.create({
      data: { userId: toUserId },
      select: { id: true }
    });
  }

  const toCartId = toCart.id;
  const itemTransferOperations: any[] = [];
  const productIdsToTransfer = fromCart.items.map(item => item.productId);

  const existingToCartItems = await prisma.cartItem.findMany({
    where: {
      cartId: toCartId,
      productId: {
        in: productIdsToTransfer,
      }
    }
  });

  const existingItemsMap = new Map(existingToCartItems.map(item => [item.productId, item]));

  for (const fromItem of fromCart.items) {
    const existingItem = existingItemsMap.get(fromItem.productId);

    if (existingItem) {
      itemTransferOperations.push(
        prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + fromItem.quantity },
        })
      );
    } else {
      itemTransferOperations.push(
        prisma.cartItem.create({
          data: {
            cartId: toCartId,
            productId: fromItem.productId,
            quantity: fromItem.quantity,
          },
        })
      );
    }
  }

  const deleteSourceItems = prisma.cartItem.deleteMany({
    where: { cartId: fromCart.id },
  });

  await prisma.$transaction([
    ...itemTransferOperations,
    deleteSourceItems,
  ]);

  revalidatePath('/basket');
}