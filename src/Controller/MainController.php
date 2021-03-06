<?php

namespace App\Controller;

use App\Service\TheMovieDBService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Forms;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

/**
 * @Route("/", name="main_")
 */
class MainController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $manager;

    /**
     * @var TheMovieDBService
     */
    private $theMovieDBService;

    public function __construct(
        EntityManagerInterface $manager,
        TheMovieDBService $theMovieDBService
    )
    {
        $this->manager = $manager;
        $this->theMovieDBService = $theMovieDBService;
    }

    /**
     * @Route("/", name="index")
     */
    public function index(
        Request $request
    )
    {
        $page = $request->get('p') ?? 1;
        $genres = $this->theMovieDBService->getListGenres();
        $movies = $this->theMovieDBService->getSortBy($page);
        $genresQuery = $request->get('genres');

        if ($genresQuery) {
            $movies = $this->theMovieDBService->getByGenres($genresQuery, $page);
        }
        
        return $this->render('main/index.html.twig', [
            'genres'        =>  $genres,
            'movies'        =>  $movies,
            'page'          =>  $page,
            'genresQuery'   =>  $genresQuery
        ]);
    }


    /**
     * @Route("/ajax/autocomplete", options={"expose"=true}, name="ajax_autocomplete")
     */
    public function ajaxAutocomplete(
        Request $request
    )
    {
        $datas = $this->theMovieDBService->searchMovie($request->get('search'));

        return new JsonResponse($datas);
    }

    /**
     * @Route("/ajax/movie/{id}", options={"expose"=true}, name="ajax_movie")
     */
    public function ajaxMovie(
        int $id
    )
    {
        $details = $this->theMovieDBService->getMovieDetails($id);
        $videos = $this->theMovieDBService->getMovieVideos($id);

        return new JsonResponse(
            [
                'id'        =>  $id,
                'details'   =>  $details,
                'videos'    =>  $videos
            ]
        );
    }
}

?>