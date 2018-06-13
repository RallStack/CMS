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
use App\Entity\Article;

class ClientController extends Controller
{

    /**
     * @Route("/")
     */
    public function indexClient()
    {
        $recupAllPage = $this->getDoctrine()->getRepository(Page::class)->findOneBy(['specialitePage' => 'accueil']);


        if (!$recupAllPage) {
            return new Response(
                '<html><body>Page non trouvée</body></html>'
            );
        }
        else{

            return $this->render('/client/accueil.html.twig', array(
                'page' => $recupAllPage
            ));
        }
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
                $recupAllArticle = $this->getDoctrine()->getRepository(article::class)->displayAllArticles();
            }

            //return $this->render('/client/client.html.twig', array(
            return $this->render('/client/client.html.twig', array(
                'page' => $recupAllPage,
                'tournois' => $recupAllTournois,
                'articles' => $recupAllArticle
            ));

        }
    }

    /**
     * @Route("/{P_namePage}/{idConsult}", name="mvPageArticleClient")
     */
    public function mvPageArticleClient($P_namePage, $idConsult)
    {


        $recupAllPage = $this->getDoctrine()->getRepository(Page::class)->findOneBy(['namePage' => $P_namePage]);


        if (!$recupAllPage && $P_namePage != 'article') {
            return new Response(
                '<html><body>Page non trouvée</body></html>'
            );
        }
        else{

            /* Recupération de tous les tournois ou article sous forme de tableau et transfert via render*/
            $recupAllTournois = null;
            $recupAllArticle = null;
            if ($P_namePage != 'article') {
                $recupSpecialitePage = $recupAllPage->getSpecialitePage();
            }
            else{
                $recupSpecialitePage = 'liste_article';
            }


            if($recupSpecialitePage =='liste_tournois'){
                echo 'remplir var $recupAllTournois';
            }
            else if($recupSpecialitePage=='liste_article'){
                $recupAllArticle = $this->getDoctrine()->getRepository(article::class)->displaySearch($idConsult);

            }
            /*return new Response(
                '<html><body>Lucky number: '.var_dump($recupAllArticle).'</body></html>'
            );*/
            //return $this->render('/client/client.html.twig', array(
            return $this->render('/client/client.html.twig', array(
                'page' => $recupAllPage,
                'tournois' => $recupAllTournois,
                'articles' => $recupAllArticle,
                'specialite' => $recupSpecialitePage
            ));

        }
    }

    public function renderNavbar()
    {
        $navbar = $this->getDoctrine()->getRepository(Theme::class)->getNavBar();

        if($navbar == null){
            $navbar = new Theme();
        }

        return new Response(
            $navbar->getMetaValue()
        );
    }
}