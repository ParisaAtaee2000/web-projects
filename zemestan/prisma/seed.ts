import { PrismaClient, ProductCategory, ProductColor, ProductSize } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    id: "p-1001",
    slug: "classic-bomber",
    name: "کاپشن بمبر کلاسیک",
    code: "NB-WM-1001",
    category: ProductCategory.BOMBER,
    unitPrice: 1_280_000,
    material: "پارچه ضدآب با آستر گرم",
    season: "زمستان",
    fit: "Regular",
    variants: [
      [ProductColor.BLACK, ProductSize.L, 18], [ProductColor.BLACK, ProductSize.XL, 24], [ProductColor.BLACK, ProductSize.XXL, 20], [ProductColor.BLACK, ProductSize.XXXL, 9],
      [ProductColor.CHARCOAL, ProductSize.L, 12], [ProductColor.CHARCOAL, ProductSize.XL, 16], [ProductColor.CHARCOAL, ProductSize.XXL, 14], [ProductColor.CHARCOAL, ProductSize.XXXL, 6],
      [ProductColor.BROWN, ProductSize.L, 8], [ProductColor.BROWN, ProductSize.XL, 10], [ProductColor.BROWN, ProductSize.XXL, 7], [ProductColor.BROWN, ProductSize.XXXL, 3],
    ],
  },
  {
    id: "p-1008",
    slug: "minimal-winter-coat",
    name: "کت زمستانه مینیمال",
    code: "CT-WM-1008",
    category: ProductCategory.COAT,
    unitPrice: 1_590_000,
    material: "فوتر ترکیبی",
    season: "زمستان",
    fit: "Regular",
    variants: [
      [ProductColor.CHARCOAL, ProductSize.L, 11], [ProductColor.CHARCOAL, ProductSize.XL, 18], [ProductColor.CHARCOAL, ProductSize.XXL, 14], [ProductColor.CHARCOAL, ProductSize.XXXL, 5],
      [ProductColor.BLACK, ProductSize.L, 9], [ProductColor.BLACK, ProductSize.XL, 15], [ProductColor.BLACK, ProductSize.XXL, 10], [ProductColor.BLACK, ProductSize.XXXL, 4],
    ],
  },
  {
    id: "p-1012",
    slug: "urban-leather-jacket",
    name: "کاپشن چرم شهری",
    code: "LJ-WM-1012",
    category: ProductCategory.LEATHER,
    unitPrice: 2_480_000,
    material: "چرم صنعتی با آستر گرم",
    season: "زمستان",
    fit: "Slim",
    variants: [
      [ProductColor.BLACK, ProductSize.L, 9], [ProductColor.BLACK, ProductSize.XL, 14], [ProductColor.BLACK, ProductSize.XXL, 10], [ProductColor.BLACK, ProductSize.XXXL, 2],
      [ProductColor.BROWN, ProductSize.L, 5], [ProductColor.BROWN, ProductSize.XL, 8], [ProductColor.BROWN, ProductSize.XXL, 6], [ProductColor.BROWN, ProductSize.XXXL, 1],
    ],
  },
  {
    id: "p-1016",
    slug: "arctic-parka",
    name: "پارکا آرکتیک",
    code: "PK-WM-1016",
    category: ProductCategory.PARKA,
    unitPrice: 1_820_000,
    material: "پارچه تکنیکال ضدباد",
    season: "زمستان",
    fit: "Relaxed",
    variants: [
      [ProductColor.OLIVE, ProductSize.L, 16], [ProductColor.OLIVE, ProductSize.XL, 22], [ProductColor.OLIVE, ProductSize.XXL, 18], [ProductColor.OLIVE, ProductSize.XXXL, 7],
      [ProductColor.BLACK, ProductSize.L, 10], [ProductColor.BLACK, ProductSize.XL, 17], [ProductColor.BLACK, ProductSize.XXL, 13], [ProductColor.BLACK, ProductSize.XXXL, 5],
    ],
  },
  {
    id: "p-1020",
    slug: "urban-technical-coat",
    name: "اورکت فنی شهری",
    code: "OC-WM-1026",
    category: ProductCategory.RAINCOAT,
    unitPrice: 1_980_000,
    material: "پارچه تکنیکال ضدآب",
    season: "زمستان",
    fit: "Regular",
    variants: [
      [ProductColor.CHARCOAL, ProductSize.L, 13], [ProductColor.CHARCOAL, ProductSize.XL, 20], [ProductColor.CHARCOAL, ProductSize.XXL, 16], [ProductColor.CHARCOAL, ProductSize.XXXL, 6],
      [ProductColor.BLACK, ProductSize.L, 8], [ProductColor.BLACK, ProductSize.XL, 15], [ProductColor.BLACK, ProductSize.XXL, 11], [ProductColor.BLACK, ProductSize.XXXL, 4],
    ],
  },
] as const;

async function main() {
  for (const product of products) {
    const saved = await prisma.product.upsert({
      where: { code: product.code },
      update: {
        name: product.name,
        unitPrice: product.unitPrice,
        category: product.category,
        material: product.material,
        season: product.season,
        fit: product.fit,
        isActive: true,
      },
      create: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        code: product.code,
        category: product.category,
        unitPrice: product.unitPrice,
        wholesalePackSize: 8,
        minWholesalePacks: 1,
        quantityStep: 1,
        material: product.material,
        season: product.season,
        fit: product.fit,
        isActive: true,
      },
    });

    await prisma.productVariant.deleteMany({ where: { productId: saved.id } });
    await prisma.productVariant.createMany({
      data: product.variants.map(([color, size, stock]) => ({
        productId: saved.id,
        color,
        size,
        stock,
      })),
    });
  }

  console.log(`Seeded ${products.length} wholesale products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
