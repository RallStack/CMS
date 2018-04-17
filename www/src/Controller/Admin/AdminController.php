<?php
/**
 * Created by PhpStorm.
 * User: Guillaume
 * Date: 17/04/2018
 * Time: 09:28
 */

// src/Controller/LuckyController.php
namespace App\Controller\Admin;

use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Routing\Annotation\Route;

class AdminController
{

    /**
     * @Route("/admin")
     */
    public function number()
    {
        return new Response(
            '<html><body><h1>BackOffice TEST</h1></body></html>'
        );
    }
}