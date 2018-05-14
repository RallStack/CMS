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
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class AdminController extends Controller
{

    /**
     * @Route("/admin")
     */
    public function index()
    {
        return $this->render('/admin/index.html.twig');
    }

    /* Routing Section Page */

    /**
     * @Route("/admin/page", name="page")
     */
    public function page()
    {
        return $this->render('/admin/page/page.html.twig');
    }

    /**
     * @Route("/admin/page/create")
     */
    public function pageCreate(Request $request)
    {


        $form = $this->createFormBuilder()
            ->add('titre', TextType::class)
            ->add('submit', SubmitType::class, array('label' => 'Créer Page'))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // $form->getData() holds the submitted values
            // but, the original `$task` variable has also been updated
            $titre_value = $form->get('titre')->getData();

            /*$em = $this->getDoctrine()->getManager();*/

            /*$film->setTitre($titre_value);
            $film->setRealisateurId($realisateur_value);
            $film->setPaysId($pays_id_value);
            $film->setAnnee($annee_value);
            $film->setSynopsis($synopsis_value);*/

            // Sauvergarde du produit
            /*$em->persist($film);*/

            // Exécution requete
            /*$em->flush();*/

            return $this->redirectToRoute('page');

        }

        return $this->render('/admin/page/pageCreate.html.twig', array(
            'form' => $form->createView(),
        ));

    }


    /* Routing Section User */

    /**
     * @Route("/admin/article")
     */
    public function article()
    {
        return $this->render('/admin/article/article.html.twig');
    }

    /**
     * @Route("/admin/article/create")
     */
    public function articleCreate()
    {
        return $this->render('/admin/article/articleCreate.html.twig');
    }

    /* Routing Section Tournois  */

    /**
     * @Route("/admin/tournois")
     */
    public function tournois()
    {
        return $this->render('/admin/tournois/tournois.html.twig');
    }

    /**
     * @Route("/admin/tournois/create")
     */
    public function tournoisCreate()
    {
        return $this->render('/admin/tournois/tournoisCreate.html.twig');
    }

    /* Routing Section User */

    /**
     * @Route("/admin/user")
     */
    public function user()
    {
        return $this->render('/admin/user/user.html.twig');
    }

    /**
     * @Route("/admin/user/create")
     */
    public function userCreate()
    {
        return $this->render('/admin/user/userCreate.html.twig');
    }
}