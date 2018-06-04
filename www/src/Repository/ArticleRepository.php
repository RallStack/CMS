<?php

namespace App\Repository;

use App\Entity\Article;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Article|null find($id, $lockMode = null, $lockVersion = null)
 * @method Article|null findOneBy(array $criteria, array $orderBy = null)
 * @method Article[]    findAll()
 * @method Article[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticleRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Article::class);
    }

    /**
     * @return Article[]
     */
    public function displayAllArticles(): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $querySelectAllArticle = '
            SELECT id, titre_article, contenu_article, auteur_article, date_article, publication_article FROM article
            ';
        $reqSelectAllArticle = $conn->prepare($querySelectAllArticle);
        $reqSelectAllArticle->execute();

        // returns an array of arrays (i.e. a raw data set)
        return $reqSelectAllArticle->fetchAll();
    }

    /**
     * @return Article[]
     * @param $search
     */
    public function displaySearch($search): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            SELECT a.id, a.titre_article, a.contenu_article, a.auteur_article, a.date_article, a.publication_article
            FROM article a
            WHERE (lower(a.titre_article) LIKE lower(:search));
            ';
        $stmt = $conn->prepare($sql);
        $stmt->execute(['search' => $search]);

        // returns an array of arrays (i.e. a raw data set)
        return $stmt->fetchAll();
    }

    /*
    public function findOneBySomeField($value): ?Article
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
