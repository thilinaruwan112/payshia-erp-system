import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Boxes,
  Package,
  ArrowDownToDot,
  AlertTriangle,
  PlusCircle,
  Warehouse,
} from 'lucide-react';
import { inventory, locations, products } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const lowStockItems = inventory.filter(
    (item) => item.stock <= item.reorderLevel
  ).length;
  const totalStock = inventory.reduce((acc, item) => acc + item.stock, 0);
  const totalSKUs = products.flatMap((p) => p.variants).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Overview</h1>
          <p className="text-muted-foreground">
            Real-time stock levels across all your locations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ArrowDownToDot className="mr-2 h-4 w-4" />
            Stock In
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Product
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Units across all locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total SKUs</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSKUs}</div>
            <p className="text-xs text-muted-foreground">Unique product variants</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locations.length}</div>
            <p className="text-xs text-muted-foreground">Warehouses and stores</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Items needing reorder</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Stock Levels</CardTitle>
          <CardDescription>
            A detailed view of your product inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                {locations.map((loc) => (
                  <TableHead key={loc.id} className="text-center">
                    {loc.name}
                  </TableHead>
                ))}
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.flatMap((product) =>
                product.variants.map((variant) => {
                  const inventoryItems = inventory.filter(
                    (item) => item.sku === variant.sku
                  );
                  const totalVariantStock = inventoryItems.reduce(
                    (sum, item) => sum + item.stock,
                    0
                  );
                  const reorderLevel = inventoryItems[0]?.reorderLevel ?? 0;
                  const status =
                    totalVariantStock === 0
                      ? 'out-of-stock'
                      : totalVariantStock <= reorderLevel
                      ? 'low-stock'
                      : 'in-stock';

                  return (
                    <TableRow key={variant.sku}>
                      <TableCell className="font-medium">
                        {product.name}
                        {(variant.color || variant.size) && (
                          <span className="text-muted-foreground text-xs ml-2">
                            ({[variant.color, variant.size].filter(Boolean).join('/')})
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{variant.sku}</TableCell>
                      {locations.map((loc) => {
                        const item = inventoryItems.find(
                          (i) => i.locationId === loc.id
                        );
                        return (
                          <TableCell key={loc.id} className="text-center">
                            {item?.stock ?? 0}
                          </TableCell>
                        );
                      })}
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            status === 'in-stock'
                              ? 'secondary'
                              : 'destructive'
                          }
                          className={cn(
                            status === 'in-stock' && 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
                            status === 'low-stock' && 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
                            status === 'out-of-stock' && 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          )}
                        >
                          {status.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
