<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => 200,
            'data' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:255',
                'status' => 'required|integer|in:0,1'
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ],400);
        }
        $category = new Category();
        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();

        return response()->json([
            'status' => 200,
            'message' => 'Category created successfully',
            'data' => $category
        ]);
    }

    public function show($id)
    {
        $category = Category::find($id);

        if ($category == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $category
        ]);
    }

    public function update(int $id, Request $request)
{
    // 1. Valider les données d'entrée
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'status' => 'required|integer|in:0,1'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 400); // Bad Request
    }

    // 2. Trouver la catégorie ou retourner une erreur
    $category = Category::find($id);

    if (!$category) {
        return response()->json([
            'message' => 'Category not found',
        ], 404);
    }

    // 3. Mise à jour de la catégorie
    $category->update([
        'name' => $request->name,
        'status' => $request->status,
    ]);

    // 4. Réponse JSON
    return response()->json([
        'message' => 'Category updated successfully',
        'data' => $category,
    ], 200);
}

    public function destroy($id)
    {
        $category = Category::find($id);

        if ($category == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found',
                'data' => []
            ], 404);
        }

        $category->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Category deleted successfully',
            'data' => []
        ],200);
    }
}

