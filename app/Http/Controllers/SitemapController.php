<?php

namespace App\Http\Controllers;

use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SitemapController extends Controller
{
    public function __invoke()
    {
        $sitemap = Sitemap::create()
            // Add static pages with proper date formatting
            ->add(Url::create('/')->setLastModificationDate(Carbon::now())->setPriority(1.0)->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY))
            ->add(Url::create('/about')->setLastModificationDate(Carbon::now())->setPriority(0.8)->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY))
            ->add(Url::create('/services')->setLastModificationDate(Carbon::now())->setPriority(0.7)->setChangeFrequency(Url::CHANGE_FREQUENCY_YEARLY))
            ->add(Url::create('/contact')->setLastModificationDate(Carbon::now())->setPriority(0.5)->setChangeFrequency(Url::CHANGE_FREQUENCY_YEARLY));
        
        // // Add dynamic database entries (e.g., published posts)
        // Post::where('is_published', true)->get()->each(function (Post $post) use ($sitemap) {
        //     $sitemap->add(
        //         Url::create("/posts/{$post->slug}")
        //             ->setActiveLastMod($post->updated_at)
        //             ->setPriority(0.7)
        //             ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
        //     );
        // });

        return $sitemap->toResponse(request());
    }
}
