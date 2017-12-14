<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Exception $exception
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof AuthorizationException) {
            return $this->unauthorized($request, $exception);
        } elseif ($exception instanceof ModelNotFoundException) {
            return $this->modelNotFound($request, $exception);
        } elseif ($exception instanceof MethodNotAllowedHttpException){
            return $this->methodNotAllowed($request, $exception);
        }

        return parent::render($request, $exception);
    }

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        return response()->json(['error' => 'Unauthenticated'], 401);
    }

    protected function unauthorized($request, AuthorizationException $exception)
    {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    protected function modelNotFound($request, ModelNotFoundException $exception)
    {
        return response()->json(['error' => 'Not found'], 404);
    }

    protected function methodNotAllowed($request, MethodNotAllowedHttpException $exception)
    {
        return response()->json(['error' => 'Method not allowed']);
    }
}
