<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    /**
     * Display order history
     * - Admin: can see all orders
     * - User: can see only their own orders
     */
    public function index()
    {
        try {
            $user = Auth::user();

            if ($user->role_id == 1) { // Admin
                $orders = Order::with(['user', 'orderItems.product'])
                    ->latest()
                    ->get();
            } else {
                $orders = Order::with(['orderItems.product'])
                    ->where('user_id', $user->id)
                    ->latest()
                    ->get();
            }

            return response()->json($orders, 200);
        } catch (\Exception $e) {
            Log::error('Order index error: ' . $e->getMessage());

            return response()->json([
                'message' => 'Failed to retrieve orders'
            ], 500);
        }
    }

    /**
     * Create a new order (Checkout)
     */
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            return DB::transaction(function () use ($request) {

                $totalAmount = 0;
                $orderItemsData = [];

                // 1. Check product stock and calculate total amount
                foreach ($request->items as $item) {

                    $product = Product::lockForUpdate()->find($item['product_id']);

                    if (!$product || $product->quantity < $item['quantity']) {
                        throw new \Exception(
                            'Insufficient stock for product: ' . ($product->product_name ?? '')
                        );
                    }

                    $totalAmount += $product->price * $item['quantity'];

                    $orderItemsData[] = [
                        'product_id' => $product->id,
                        'quantity'   => $item['quantity'],
                        'unit_price' => $product->price, // price at purchase time
                    ];

                    // Reduce product stock
                    $product->decrement('quantity', $item['quantity']);
                }

                // 2. Create order
                $order = Order::create([
                    'user_id'      => Auth::id(),
                    'total_amount' => $totalAmount,
                    'status'       => 'pending'
                ]);

                // 3. Create order items
                foreach ($orderItemsData as $itemData) {
                    $order->orderItems()->create($itemData);
                }

                return response()->json([
                    'message' => 'Order placed successfully',
                    'order'   => $order->load(['orderItems.product'])
                ], 201);
            });
        } catch (\Exception $e) {
            Log::error('Order store error: ' . $e->getMessage());

            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Display details of a single order
     */
    public function show($id)
    {
        try {
            $order = Order::with(['user', 'orderItems.product'])->find($id);

            if (!$order) {
                return response()->json([
                    'message' => 'Order not found'
                ], 404);
            }

            // Prevent users from accessing other users' orders
            if (Auth::id() !== $order->user_id && Auth::user()->role_id !== 1) {
                return response()->json([
                    'message' => 'You are not authorized to view this order'
                ], 403);
            }

            return response()->json($order, 200);
        } catch (\Exception $e) {
            Log::error('Order show error: ' . $e->getMessage());

            return response()->json([
                'message' => 'Failed to retrieve order details'
            ], 500);
        }
    }

    /**
     * Update order status (Admin only)
     */
    public function update(Request $request, $id)
    {
        try {
            $order = Order::find($id);

            if (!$order) {
                return response()->json([
                    'message' => 'Order not found'
                ], 404);
            }

            $request->validate([
                'status' => 'required|in:pending,processing,completed,cancelled'
            ]);

            $order->update([
                'status' => $request->status
            ]);

            return response()->json([
                'message' => 'Order status updated successfully',
                'order'   => $order
            ], 200);
        } catch (\Exception $e) {
            Log::error('Order update error: ' . $e->getMessage());

            return response()->json([
                'message' => 'Failed to update order status'
            ], 500);
        }
    }

    /**
     * Delete an order (not recommended, usually use status = cancelled)
     */
    public function destroy($id)
    {
        try {
            $order = Order::find($id);

            if (!$order) {
                return response()->json([
                    'message' => 'Order not found'
                ], 404);
            }

            $order->delete();

            return response()->json([
                'message' => 'Order deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Order delete error: ' . $e->getMessage());

            return response()->json([
                'message' => 'Failed to delete order'
            ], 500);
        }
    }
}
