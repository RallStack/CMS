<?php
/**
 * Created by PhpStorm.
 * User: Guillaume
 * Date: 17/04/2018
 * Time: 09:37
 */


// src/Controller/LuckyController.php
namespace App\Controller\Client;

use App\Entity\Theme;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use App\Entity\Page;

class ClientController extends Controller
{

    /**
     * @Route("/")
     */
    public function indexClient()
    {
        return $this->render('/client/accueil.html.twig');
    }

    /**
     * @Route("/{P_namePage}", name="mvPageClient")
     */
    public function mvPageClient($P_namePage)
    {
        $recupAllPage = $this->getDoctrine()->getRepository(Page::class)->findOneBy(['namePage' => $P_namePage]);

        if (!$recupAllPage) {
            return new Response(
                '<html><body>Page non trouvée</body></html>'
            );
        }
        else{

            /* Recupération de tous les tournois ou article sous forme de tableau et transfert via render*/
            $recupAllTournois = null;
            $recupAllArticle = null;

            $recupSpecialitePage = $recupAllPage->getSpecialitePage();

            if($recupSpecialitePage =='liste_tournois'){
                echo 'remplir var $recupAllTournois';
            }
            else if($recupSpecialitePage=='liste_article'){
                echo 'remplir var $recupAllArticle';
            }

            return $this->render('/client/page.html.twig', array(
                'page' => $recupAllPage,
                'tournois' => $recupAllTournois,
                'article' => $recupAllArticle
            ));

        }
    }

    public function renderNavbar()
    {
        $navbar = $this->getDoctrine()->getRepository(Theme::class)->getNavBar();

        return new Response(
            $navbar->getMetaValue()
        );
    }
}