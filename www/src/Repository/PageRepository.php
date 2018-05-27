<?php

namespace App\Repository;

use App\Entity\Page;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Page|null find($id, $lockMode = null, $lockVersion = null)
 * @method Page|null findOneBy(array $criteria, array $orderBy = null)
 * @method Page[]    findAll()
 * @method Page[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PageRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Page::class);
    }

    /**
     * @return Page[]
     */
    public function displayAllPages(): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $querySelectAllPage = '
            SELECT id, name_page, specialite_page, IF(LENGTH(description_page) < 150, description_page, CONCAT(SUBSTR(description_page,1, 40), " ...")) as description_page FROM page
            ';
        $reqSelectAllPage = $conn->prepare($querySelectAllPage);
        $reqSelectAllPage->execute();

        // returns an array of arrays (i.e. a raw data set)
        return $reqSelectAllPage->fetchAll();
    }

    /**
    * @return Page[]
    * @param $search
    */
    public function displaySearch($search): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            SELECT p.id, p.name_page, p.description_page, p.specialite_page
            FROM page p
            WHERE (lower(p.name_page) LIKE lower(:search));
            ';
        $stmt = $conn->prepare($sql);
        $stmt->execute(['search' => $search]);

        // returns an array of arrays (i.e. a raw data set)
        return $stmt->fetchAll();
    }

    /*
    public function findOneBySomeField($value): ?Page
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
