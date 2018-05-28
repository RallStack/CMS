<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ArticleRepository")
 */
class Article
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=3600)
     */
    private $titreArticle;

    /**
     * @ORM\Column(type="text", length=64000)
     */
    private $contenuArticle;

    /**
     * @ORM\Column(type="string", length=3600)
     */
    private $auteurArticle;

    /**
     * @ORM\Column(type="date", length=3600)
     */
    private $dateArticle;

    /**
     * @ORM\Column(type="boolean", length=3600)
     */
    private $publicationArticle;

    public function getId()
    {
        return $this->id;
    }

    public function getTitreArticle()
    {
        return $this->titreArticle;
    }

    public function setTitreArticle($titreArticle)
    {
        $this->titreArticle = $titreArticle;
    }

    public function getContenuArticle()
    {
        return $this->contenuArticle;
    }

    public function setContenuArticle($contenuArticle)
    {
        $this->contenuArticle = $contenuArticle;
    }

    public function getAuteurArticle()
    {
        return $this->auteurArticle;
    }

    public function setAuteurArticle($auteurArticle)
    {
        $this->auteurArticle = $auteurArticle;
    }

    public function getDateArticle()
    {
        return $this->dateArticle;
    }

    public function setDateArticle($dateArticle)
    {
        $this->dateArticle = $dateArticle;
    }

    public function getPublicationArticle()
    {
        return $this->publicationArticle;
    }

    public function setPublicationArticle($publicationArticle)
    {
        $this->publicationArticle = $publicationArticle;
    }
}
