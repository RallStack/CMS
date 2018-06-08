<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ThemeRepository")
 */
class Theme
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
    private $meta_attribute;

    /**
     * @ORM\Column(type="string", length=1024, nullable=true)
     */
    private $meta_value;

    public function getId()
    {
        return $this->id;
    }

    public function getMetaAttribute(): ?string
    {
        return $this->meta_attribute;
    }

    public function setMetaAttribute(string $meta_attribute): self
    {
        $this->meta_attribute = $meta_attribute;

        return $this;
    }

    public function getMetaValue(): ?string
    {
        return $this->meta_value;
    }

    public function setMetaValue(?string $meta_value): self
    {
        $this->meta_value = $meta_value;

        return $this;
    }
}
