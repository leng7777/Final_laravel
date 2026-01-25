<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order_item extends Model
{
    use HasFactory;

    protected $table = 'order_items';

    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'unit_price',
    ];

    /* ================= Relationships ================= */

    // Order_item belongs to Order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Order_item belongs to Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /* ================= Helper ================= */

    // Total price of this item
    public function getTotalAttribute()
    {
        return $this->quantity * $this->unit_price;
    }
}
