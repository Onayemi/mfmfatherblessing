<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('welcome');
    }

    public function about(): Response
    {
        return Inertia::render('public/about');
    }

    public function services(): Response
    {
        return Inertia::render('public/services');
    }

    public function contact(): Response
    {
        return Inertia::render('public/contact');
    }
}
