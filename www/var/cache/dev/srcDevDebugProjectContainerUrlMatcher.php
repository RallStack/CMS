<?php

use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\RequestContext;

/**
 * This class has been auto-generated
 * by the Symfony Routing Component.
 */
class srcDevDebugProjectContainerUrlMatcher extends Symfony\Bundle\FrameworkBundle\Routing\RedirectableUrlMatcher
{
    public function __construct(RequestContext $context)
    {
        $this->context = $context;
    }

    public function match($rawPathinfo)
    {
        $allow = array();
        $pathinfo = rawurldecode($rawPathinfo);
        $trimmedPathinfo = rtrim($pathinfo, '/');
        $context = $this->context;
        $request = $this->request ?: $this->createRequest($pathinfo);
        $requestMethod = $canonicalMethod = $context->getMethod();

        if ('HEAD' === $requestMethod) {
            $canonicalMethod = 'GET';
        }

        // app_admin_admin_number
        if ('/admin' === $pathinfo) {
            return array (  '_controller' => 'App\\Controller\\Admin\\AdminController::number',  '_route' => 'app_admin_admin_number',);
        }

        // app_client_client_number
        if ('' === $trimmedPathinfo) {
            $ret = array (  '_controller' => 'App\\Controller\\Client\\ClientController::number',  '_route' => 'app_client_client_number',);
            if ('/' === substr($pathinfo, -1)) {
                // no-op
            } elseif ('GET' !== $canonicalMethod) {
                goto not_app_client_client_number;
            } else {
                return array_replace($ret, $this->redirect($rawPathinfo.'/', 'app_client_client_number'));
            }

            return $ret;
        }
        not_app_client_client_number:

        throw 0 < count($allow) ? new MethodNotAllowedException(array_unique($allow)) : new ResourceNotFoundException();
    }
}
