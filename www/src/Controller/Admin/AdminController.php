<?php
/**
 * Created by PhpStorm.
 * User: Guillaume
 * Date: 17/04/2018
 * Time: 09:28
 */

// src/Controller/LuckyController.php
namespace App\Controller\Admin;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class AdminController extends Controller
{

    /**
     * @Route("/admin")
     */
    public function number()
    {
        return $this->render('/admin/base.html.twig');
    }
}