<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function authenticate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])) {

            $user = User::find(Auth::user()->id);

            if($user->role == 'admin') {
                
                $token = $user->createToken('token')->plainTextToken;

                return response()->json(['status' => 200, 'token' => $token, 'id' => $user->id ,'name'=> $user->name], 200);
            }else {
                // User is authenticated, you can return user data or token here
                return response()->json(['message' => 'You are not autorized to access admin panel', 'user' => $user],401);
            }

            // return response()->json(['message' => 'User authenticated successfully']);
        }else {
            // Authentication failed
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

    }
}
