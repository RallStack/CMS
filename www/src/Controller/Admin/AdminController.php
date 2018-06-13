<?php
/**
 * Created by PhpStorm.
 * User: Guillaume
 * Date: 17/04/2018
 * Time: 09:28
 */

// src/Controller/LuckyController.php
namespace App\Controller\Admin;

use App\Entity\Theme;
use App\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\Form\Extension\Core\Type\PasswordType;
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
use App\Entity\Article;

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
                        'Page d\'accueil' => 'accueil'
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
            ->add('descriptionPage', TextareaType::class, array('attr' => array('class' => 'ckeditor')))
            ->add('specialitePage', ChoiceType::class,
                array(
                    'label' => 'Specialite de votre Page',
                    'choices'  =>  array(
                        'Page tournois' => 'liste_tournois',
                        'Page articles' => 'liste_article',
                        'Page vierge' => 'page_vierge',
                        'Page d\'accueil' => 'accueil'
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


    /* Routing Section Article */

    /**
     * @Route("/admin/article" , name="article")
     */
    public function article()
    {
        $displayAllArticles = $this->getDoctrine()->getRepository(article::class)->displayAllArticles();

        return $this->render('/admin/article/article.html.twig', array(
            "articles" => $displayAllArticles
        ));
    }

    /**
     * @Route("/admin/article/create")
     */
    public function articleCreate(Request $request)
    {
        $article = new Article();

        $form = $this->createFormBuilder($article)
            ->add('titreArticle', TextType::class, array('label' => 'Nom de votre Article'))
            ->add('auteurArticle', TextType::class, array('label' => 'Auteur votre Article'))
            ->add('publicationArticle', ChoiceType::class,
                array(
                    'label' => 'Publication de votre Article',
                    'choices'  =>  array(
                        'Oui' => '1',
                        'Non' => '0',
                    )
                )
            )
            ->add('contenuArticle', TextareaType::class, array('attr' => array('class' => 'ckeditor')))

            ->add('submit', SubmitType::class, array('label' => 'Créer Article'))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // $form->getData() holds the submitted values
            // but, the original `$task` variable has also been updated
            $titreArticle = $form->get('titreArticle')->getData();
            $auteurArticle = $form->get('auteurArticle')->getData();
            $publicationArticle = $form->get('publicationArticle')->getData();
            $contenuArticle = $form->get('contenuArticle')->getData();

            $insertNewArticle = $this->getDoctrine()->getManager();

            $article->setTitreArticle($titreArticle);
            $article->setAuteurArticle($auteurArticle);
            $article->setDateArticle(new \DateTime(date('Y-m-d')));
            $article->setPublicationArticle($publicationArticle);
            $article->setContenuArticle($contenuArticle);

            // Sauvergarde de la page
            $insertNewArticle->persist($article);

            // Exécution requete - Insertion des données de la page en base
            $insertNewArticle->flush();

            return $this->redirectToRoute('article');

        }

        return $this->render('/admin/article/articleCreate.html.twig', array(
            'form' => $form->createView(),
        ));
    }

    /**
     * @Route("/admin/article/edit/{id_editArticle}", name="article_edit")
     */
    public function articleEdit($id_editArticle, Request $request)
    {

        // you can fetch the EntityManager via $this->getDoctrine()
        $em = $this->getDoctrine()->getManager();
        $article = $em->getRepository(Article::class)->findOneBy(['id' => $id_editArticle]);

        if (!$article) {
            throw $this->createNotFoundException(
                'Pas d\'article trouvé'
            );
        }


        $form = $this->createFormBuilder($article)
            ->add('titreArticle', TextType::class, array('label' => 'Nom de votre Article'))
            ->add('auteurArticle', TextType::class, array('label' => 'Auteur votre Article'))
            ->add('publicationArticle', ChoiceType::class,
                array(
                    'label' => 'Publication de votre Article',
                    'choices'  =>  array(
                        'Oui' => '1',
                        'Non' => '0',
                    )
                )
            )
            ->add('contenuArticle', TextareaType::class, array('attr' => array('class' => 'ckeditor')))

            ->add('submit', SubmitType::class, array('label' => 'Modifier l\'article'))
            ->getForm();

        $form->handleRequest($request);


        if ($form->isSubmitted() && $form->isValid()) {
            $titreArticle = $form->get('titreArticle')->getData();
            $auteurArticle = $form->get('auteurArticle')->getData();
            $publicationArticle = $form->get('publicationArticle')->getData();
            $contenuArticle = $form->get('contenuArticle')->getData();

            $insertNewArticle = $this->getDoctrine()->getManager();

            $article->setTitreArticle($titreArticle);
            $article->setAuteurArticle($auteurArticle);
            $article->setDateArticle(new \DateTime(date('Y-m-d')));
            $article->setPublicationArticle($publicationArticle);
            $article->setContenuArticle($contenuArticle);

            // Sauvergarde de la page
            $insertNewArticle->persist($article);

            // Exécution requete - Insertion des données de la page en base
            $insertNewArticle->flush();

            $displayAllArticles = $this->getDoctrine()->getRepository(Article::class)->displayAllArticles();
            // just setup a fresh $task object (remove the dummy data)
            return $this->render('/admin/article/article.html.twig', array(
                "articles" => $displayAllArticles
            ));
        }

        return $this->render('/admin/article/articleEdit.html.twig', array(
            'form' => $form->createView(),
        ));

    }

    /**
     * @Route("/admin/article/delete/{id_deleteArticle}", name="article_delete")
     */
    public function articleDelete($id_deleteArticle, Request $request)
    {
        // you can fetch the EntityManager via $this->getDoctrine()

        $em = $this->getDoctrine()->getManager();
        $recupArticleDelete = $em->getRepository(Article::class)->findOneBy(['id' => $id_deleteArticle]);

        if (!$recupArticleDelete) {
            throw $this->createNotFoundException(
                'Pas d\'article trouvé'
            );
        }

        $em->remove($recupArticleDelete);
        $em->flush();

        $displayAllArticle = $this->getDoctrine()->getRepository(Article::class)->displayAllArticles();

        return $this->render('/admin/article/article.html.twig', array(
            "articles" => $displayAllArticle
        ));
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

    /* Routing Section Menu */

    /**
     * @Route("/admin/menu", name="menu_index")
     */
    public function menu(Request $request)
    {
        $entityManager = $this->getDoctrine()->getManager();

        $Page = $entityManager->getRepository(Page::class)->displayAllPages();
        $Article = $entityManager->getRepository(article::class)->displayAllArticles();
        //$Tournament = $entityManager->getRepository(Tournament::class)->displayAllArticles();
        $Theme = $entityManager->getRepository(Theme::class)->getNavBar();

        if (!$Theme) {
            $Theme = new Theme();
        }

        $form = $this->createFormBuilder($Theme)
            ->add('meta_value', TextType::class, array('required' => false))
            ->add('submit', SubmitType::class, array('label' => 'Sauvegarder'))
            ->getForm();
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $value = $form->get('meta_value')->getData();

            $Theme->setMetaAttribute("meta-main-menu");
            $Theme->setMetaValue($value);

            $entityManager->persist($Theme);

            $entityManager->flush();

            return $this->redirectToRoute('menu_index');

        }

        return $this->render('/admin/menu/index.html.twig', array(
            "pages" => $Page,
            "articles" => $Article,
            "tournaments" => null,
            "theme" => $Theme,
            'form' => $form->createView()
        ));
    }

    /* Routing Section User */


    /**
     * @Route("/admin/user", name="user")
     */
    public function user()
    {
        $displayAllUsers = $this->getDoctrine()->getRepository(User::class)->displayAllUsers();

        return $this->render('/admin/user/user.html.twig', array(
            "users" => $displayAllUsers
        ));
    }

    /**
     * @Route("/admin/user/create")
     */
    public function userCreate(Request $request)
    {
        $user = new User();

        $form = $this->createFormBuilder($user)
            ->add('username', TextType::class, array('label' => 'Nom d\'utilisateur'))
            ->add('email', TextType::class, array('label' => 'email'))
            ->add('password', PasswordType::class, array('label' => 'Mot de passe'))
            ->add('submit', SubmitType::class, array('label' => 'Créer un utilisateur'))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // $form->getData() holds the submitted values
            // but, the original `$task` variable has also been updated
            $username = $form->get('username')->getData();
            $email = $form->get('email')->getData();
            $password = $form->get('password')->getData();

            $insertNewUser = $this->getDoctrine()->getManager();

            $user->setUsername($username);
            $user->setEmail($email);
            $user->setPassword($password);

            // Sauvergarde de la page
            $insertNewUser->persist($user);

            // Exécution requete - Insertion des données de la page en base
            $insertNewUser->flush();

            return $this->redirectToRoute('user');

        }

        return $this->render('/admin/user/userCreate.html.twig', array(
            'form' => $form->createView(),
        ));

    }

    /**
     * @Route("/admin/user/edit/{id_editUser}", name="user_edit")
     */
    public function userEdit($id_editUser, Request $request)
    {

        // you can fetch the EntityManager via $this->getDoctrine()
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(User::class)->findOneBy(['id' => $id_editUser]);

        if (!$user) {
            throw $this->createNotFoundException(
                'Pas d\'utilisateur trouvé'
            );
        }
        $id = $user->getId();
        $username = $user->getUsername();
        $email = $user->getEmail();
        $password = $user->getPassword();


        $form = $this->createFormBuilder($user)
            ->add('username', TextType::class, array('label' => 'Nom d\'utilisateur'))
            ->add('email', TextType::class, array('label' => 'email'))
            ->add('password', PasswordType::class, array('label' => 'Mot de passe'))
            ->add('submit', SubmitType::class, array('label' => 'Modifier un utilisateur'))
            ->getForm();

        $form->handleRequest($request);


        if ($form->isSubmitted() && $form->isValid()) {

            $form_username = $form->get('username')->getData();
            $form_email = $form->get('email')->getData();
            $form_password = $form->get('password')->getData();

            $em = $this->getDoctrine()->getManager();

            $user->setUsername($form_username);
            $user->setEmail($form_email);
            $user->setPassword($form_password);

            // Sauvergarde du produit
            $em->persist($user);

            // Exécution requete
            $em->flush();

            $displayAllUsers = $this->getDoctrine()->getRepository(User::class)->displayAllUsers();
            // just setup a fresh $task object (remove the dummy data)
            return $this->render('/admin/user/user.html.twig', array(
                "users" => $displayAllUsers
            ));
        }

        return $this->render('/admin/user/userEdit.html.twig', array(
            'form' => $form->createView(),
        ));

    }

    /**
     * @Route("/admin/user/delete/{id_deleteUser}", name="user_delete")
     */
    public function userDelete($id_deleteUser, Request $request)
    {
        // you can fetch the EntityManager via $this->getDoctrine()

        $em = $this->getDoctrine()->getManager();
        $recupUserDelete = $em->getRepository(User::class)->findOneBy(['id' => $id_deleteUser]);

        if (!$recupUserDelete) {
            throw $this->createNotFoundException(
                'Pas d\'utilisateur trouvé'
            );
        }

        $em->remove($recupUserDelete);
        $em->flush();

        $displayAllUsers = $this->getDoctrine()->getRepository(User::class)->displayAllUsers();

        return $this->render('/admin/user/user.html.twig', array(
            "users" => $displayAllUsers
        ));
    }
}
