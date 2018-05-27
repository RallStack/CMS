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
use Symfony\Component\Form\Extension\Core\Type\TextareaType;


use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\RouteCollection;

use App\Entity\Page;

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
        $displayAllPages = $this->getDoctrine()->getRepository(Page::class)->displayAllPages();

        return $this->render('/admin/page/page.html.twig', array(
            "pages" => $displayAllPages
        ));
    }

    /**
     * @Route("/admin/page/create")
     */
    public function pageCreate(Request $request)
    {
        $page = new Page();

        $form = $this->createFormBuilder($page)
            ->add('namePage', TextType::class, array('label' => 'Nom de votre Page'))
            ->add('descriptionPage', TextareaType::class, array('attr' => array('class' => 'ckeditor')))
            ->add('specialitePage', ChoiceType::class,
                array(
                    'label' => 'Specialite de votre Page',
                    'choices'  =>  array(
                        'Page tournois' => 'liste_tournois',
                        'Page articles' => 'liste_article',
                        'Page vierge' => 'page_vierge',
                    )
                )
            )
            ->add('submit', SubmitType::class, array('label' => 'Créer Page'))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // $form->getData() holds the submitted values
            // but, the original `$task` variable has also been updated
            $namePage_value = $form->get('namePage')->getData();
            $descriptionPage = $form->get('descriptionPage')->getData();
            $specialitePage = $form->get('specialitePage')->getData();

            $insertNewPage = $this->getDoctrine()->getManager();

            $page->setNamePage($namePage_value);
            $page->setDescriptionPage($descriptionPage);
            $page->setSpecialitePage($specialitePage);

            // Sauvergarde de la page
            $insertNewPage->persist($page);

            // Exécution requete - Insertion des données de la page en base
            $insertNewPage->flush();

            return $this->redirectToRoute('page');

        }

        return $this->render('/admin/page/pageCreate.html.twig', array(
            'form' => $form->createView(),
        ));

    }

    /**
     * @Route("/admin/page/edit/{id_editPage}", name="page_edit")
     */
    public function pageEdit($id_editPage, Request $request)
    {

        // you can fetch the EntityManager via $this->getDoctrine()
        $em = $this->getDoctrine()->getManager();
        $page = $em->getRepository(Page::class)->findOneBy(['id' => $id_editPage]);

        if (!$page) {
            throw $this->createNotFoundException(
                'Pas de page trouvée'
            );
        }
        $getActualIdPage = $page->getId();
        $getActualNamePage = $page->getNamePage();
        $getActualDescriptionPage = $page->getDescriptionPage();
        $getActualSpecialitePage = $page->getSpecialitePage();


        $form = $this->createFormBuilder($page)
            ->add('namePage', TextType::class, array('label' => 'Nom de votre Page'))
            ->add('descriptionPage', TextType::class, array('label' => 'Description de votre Page'))
            ->add('specialitePage', ChoiceType::class,
                array(
                    'label' => 'Specialite de votre Page',
                    'choices'  =>  array(
                        'Page tournois' => 'liste_tournois',
                        'Page articles' => 'liste_article',
                        'Page vierge' => 'page_vierge',
                    )
                )
            )
            ->add('submit', SubmitType::class, array('label' => 'Modifier Page'))
            ->getForm();

        $form->handleRequest($request);


        if ($form->isSubmitted() && $form->isValid()) {
            // $form->getData() holds the submitted values
            // but, the original `$task` variable has also been updated
            $form_namePage = $form->get('namePage')->getData();
            $form_descriptionPage = $form->get('descriptionPage')->getData();
            $form_specialitePage = $form->get('specialitePage')->getData();

            $em = $this->getDoctrine()->getManager();

            $page->setNamePage($form_namePage);
            $page->setDescriptionPage($form_descriptionPage);
            $page->setSpecialitePage($form_specialitePage);

            // Sauvergarde du produit
            $em->persist($page);

            // Exécution requete
            $em->flush();

            $displayAllPages = $this->getDoctrine()->getRepository(Page::class)->displayAllPages();
            // just setup a fresh $task object (remove the dummy data)
            return $this->render('/admin/page/page.html.twig', array(
                "pages" => $displayAllPages
            ));
        }

        return $this->render('/admin/page/pageEdit.html.twig', array(
            'form' => $form->createView(),
        ));

    }

    /**
     * @Route("/admin/page/delete/{id_deletePage}", name="page_delete")
     */
    public function pageDelete($id_deletePage, Request $request)
    {
        // you can fetch the EntityManager via $this->getDoctrine()

        $em = $this->getDoctrine()->getManager();
        $recupPageDelete = $em->getRepository(Page::class)->findOneBy(['id' => $id_deletePage]);

        if (!$recupPageDelete) {
            throw $this->createNotFoundException(
                'Pas de page trouvée'
            );
        }

        $em->remove($recupPageDelete);
        $em->flush();

        $displayAllPages = $this->getDoctrine()->getRepository(Page::class)->displayAllPages();

        return $this->render('/admin/page/page.html.twig', array(
            "pages" => $displayAllPages
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
