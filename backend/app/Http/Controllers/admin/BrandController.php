<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => 200,
            'data' => $brands
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
        $brand = new Brand();
        $brand->name = $request->name;
        $brand->status = $request->status;
        $brand->save();

        return response()->json([
            'status' => 200,
            'message' => 'Brand created successfully',
            'data' => $brand
        ]);
    }

    public function show($id)
    {
        $brand = Brand::find($id);

        if ($brand == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $brand
        ]);
    }

    public function update($id, Request $request)
    {

        $brand = Brand::find($id);

        if ($brand == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $brand
        ]);

        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:255',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ],400);
        }
        
        $brand->name = $request->name;
        $brand->status = $request->status;
        $brand->update();

        return response()->json([
            'status' => 200,
            'message' => 'brand updated successfully',
            'data' => $brand
        ],200);
    }

    public function destroy($id)
    {
        $brand = Brand::find($id);

        if ($brand == null) {
            return response()->json([
                'status' => 404,
                'message' => 'brand not found',
                'data' => []
            ], 404);
        }

        $brand->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Category deleted successfully',
            'data' => []
        ],200);
    }
}
