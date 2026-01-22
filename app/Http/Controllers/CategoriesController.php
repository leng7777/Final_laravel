<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
use Exception;

class CategoriesController extends Controller
{
    /**
     * បង្ហាញ Category ទាំងអស់
     */
    public function index()
    {
        try {
            $categories = Categories::all();
            return response()->json($categories, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'មានបញ្ហាកើតឡើង',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * បង្កើត Category ថ្មី
     */
    public function store(Request $request)
    {
        try {
            $fields = $request->validate([
                'category_name' => 'required|string|unique:categories,category_name|max:255',
            ]);

            $category = Categories::create($fields);

            return response()->json([
                'message' => 'ប្រភេទផលិតផលត្រូវបានបង្កើត',
                'category' => $category
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'មិនអាចបង្កើត Category បានទេ',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * បង្ហាញ Category មួយ (ជាមួយ Products)
     */
    public function show($id)
    {
        try {
            $category = Categories::with('products')->find($id);

            if (!$category) {
                return response()->json([
                    'message' => 'រកមិនឃើញប្រភេទផលិតផលនេះទេ'
                ], 404);
            }

            return response()->json($category, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'មានបញ្ហាក្នុងការទាញទិន្នន័យ',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * កែប្រែ Category
     */
    public function update(Request $request, $id)
    {
        try {
            $category = Categories::find($id);

            if (!$category) {
                return response()->json([
                    'message' => 'រកមិនឃើញទិន្នន័យដើម្បីកែប្រែ'
                ], 404);
            }

            $fields = $request->validate([
                'category_name' => 'required|string|unique:categories,category_name,' . $id . '|max:255',
            ]);

            $category->update($fields);

            return response()->json([
                'message' => 'បានកែប្រែដោយជោគជ័យ',
                'category' => $category
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'មិនអាចកែប្រែបានទេ',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * លុប Category
     */
    public function destroy($id)
    {
        try {
            $category = Categories::find($id);

            if (!$category) {
                return response()->json([
                    'message' => 'រកមិនឃើញទិន្នន័យដើម្បីលុប'
                ], 404);
            }

            $category->delete();

            return response()->json([
                'message' => 'លុបប្រភេទផលិតផលរួចរាល់'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'មិនអាចលុបបានទេ',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
