<?php
/**
 * Created by PhpStorm.
 * User: Guillaume
 * Date: 17/04/2018
 * Time: 09:37
 */


// src/Controller/LuckyController.php
namespace App\Controller\Client;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class ClientController extends Controller
{

    /**
     * @Route("/")
     */
    public function indexClient()
    {
        return $this->render('/client/base.html.twig');
    }
}