<?php

namespace App\Service;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Http\Client\Exception\RequestException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

class TheMovieDBService
{

    /**
     * @var ParameterBagInterface
     */
    private $params;

    /**
     * string
     */
    private $language;

    /**
     * string
     */
    private $apiKey;

    /**
     * @var EntityManagerInterface
     */
    private $manager;

    /**
     * @var Client
     */
    private $client;

    public function __construct(
        ParameterBagInterface $params,
        EntityManagerInterface $manager
    ) {
        $this->params = $params;
        $this->manager = $manager;
        $this->client = new Client([
            'base_uri' => "https://api.themoviedb.org"
        ]);
        $this->language = "fr-FR";
        $this->apiKey = $this->setApiKey();
    }

    private function call(
        string $method,
        string $url,
        array $params = []
    )
    {
        $params['language'] = $this->language;
        $params['api_key'] = $this->apiKey;

        try {
            $response = $this->client->request(
                $method,
                $url,
                [
                    'query' => $params,
                ]
            );
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            // Save in a log
            var_dump($e->getResponse()); die();
        }

        return json_decode($response->getBody()->getContents(), true);
    }

    private function setApiKey()
    {
        return $this->params->get('themoviedb_apikey');
    }

    public function getListGenres()
    {
        return $this->call(
            'GET',
            '/3/genre/movie/list',
        )['genres'];
    }

    private function getDiscoverDatas()
    {
        return [
            'method'    =>  'GET',
            'url'       =>  '/3/discover/movie'
        ];
    }

    public function getSortBy(
        int $page,
        string $sortBy = 'popularity.desc'
    )
    {
        $discoverDatas = $this->getDiscoverDatas();
        return $this->call(
            $discoverDatas['method'],
            $discoverDatas['url'],
            [
                'sort_by'       =>  $sortBy,
                'page'          =>  $page
            ]
        );
    }

    public function getByGenres(
        array $genresId,
        int $page,
        string $sortBy = 'popularity.desc'
    )
    {
        $discoverDatas = $this->getDiscoverDatas();
        return $this->call(
            $discoverDatas['method'],
            $discoverDatas['url'],
            [
                'with_genres'   =>  implode(',', $genresId),
                'sort_by'       =>  $sortBy,
                'page'          =>  $page
            ]
        );
    }

    public function getMovieDetails(
        int $id
    )
    {
        return $this->call(
            "GET",
            "/3/movie/" . $id,
            []
        );
    }

    public function getMovieVideos(
        int $id
    )
    {
        return $this->call(
            "GET",
            "/3/movie/" . $id . "/videos",
            []
        );
    }
}


?>