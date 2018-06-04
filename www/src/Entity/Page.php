<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PageRepository")
 */
class Page
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $namePage;

    /**
     * @ORM\Column(type="text", length=64000)
     */
    private $descriptionPage;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $specialitePage;

    public function getId()
    {
        return $this->id;
    }

    public function getNamePage()
    {
        return $this->namePage;
    }

    public function setNamePage($namePage)
    {
        $this->namePage = $namePage;
    }

    public function getDescriptionPage()
    {
        return $this->descriptionPage;
    }

    public function setDescriptionPage($descriptionPage)
    {
        $this->descriptionPage = $descriptionPage;
    }

    public function getSpecialitePage()
    {
        return $this->specialitePage;
    }

    public function setSpecialitePage($specialitePage)
    {
        $this->specialitePage = $specialitePage;
    }
}
