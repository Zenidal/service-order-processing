<?php

namespace App\Http\Controllers;

use App\Order;
use App\OrderStatusHistory;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Response;

class OrderStatusHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Order $order
     * @return Response
     * @throws AuthorizationException
     */
    public function show(Order $order)
    {
        if (!\Auth::user()->can('view', [$order, OrderStatusHistory::class]))
            throw new AuthorizationException();
        return new Response(['error' => '', 'orderStatusHistories' => $order->orderStatusHistories]);
    }
}