<?php

namespace App\Http\Controllers;

use App\CompanyBranch;
use App\Order;
use App\Resolvers\OrderStateMachine;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Validator;

class OrderController extends Controller
{
    /**
     * @var OrderStateMachine
     */
    private $orderStateMachine;

    /**
     * OrderController constructor.
     * @param OrderStateMachine $orderStateMachine
     */
    public function __construct(OrderStateMachine $orderStateMachine)
    {
        $this->orderStateMachine = $orderStateMachine;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new Response(['error' => '', 'orders' => Order::all()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /** @var Validator $validator */
        $validator = Validator::make($request->all(), [
            'description' => 'required',
            'company_branch_id' => 'numeric|required'
        ]);
        if ($validator->fails()) {
            return new Response(['error' => $validator->errors()->all(), 'order' => $request->all()], Response::HTTP_BAD_REQUEST);
        }
        if (!($companyBranch = CompanyBranch::find($request->company_branch_id))) {
            return new Response(['error' => "Company branch with id {$request->company_branch_id} not found.", 'order' => $request], Response::HTTP_BAD_REQUEST);
        }
        $order = new Order();
        $order->description = $request->description;
        $order->status = OrderStateMachine::OPEN_STATUS;
        $companyBranch->orders()->save($order);
        return new Response(['error' => '', 'order' => $order]);
    }

    /**
     * Display the specified resource.
     *
     * @param  Order $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        return new Response(['error' => '', 'order' => $order]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Order $order
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(Order $order, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required',
            'company_branch_id' => 'numeric|required'
        ]);
        if ($validator->fails()) {
            return new Response(['error' => $validator->errors()->all(), 'order' => $request->all()], Response::HTTP_BAD_REQUEST);
        }
        if (!($companyBranch = CompanyBranch::find($request->company_branch_id))) {
            return new Response(['error' => "Company branch with id {$request->company_branch_id} not found.", 'order' => $request], Response::HTTP_BAD_REQUEST);
        }
        $order->description = $request->description;
        $companyBranch->orders()->save($order);
        return new Response(['error' => '', 'order' => $order]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Order $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        if ($order->forceDelete()) {
            return new Response(['error' => '', 'order' => $order]);
        }
        return new Response(['error' => "Order with id {$order->id} wasn't deleted."], Response::HTTP_BAD_REQUEST);
    }

    /**
     * @param  Order $order
     * @param Request $request
     * @return Response
     */
    public function assign(Order $order, Request $request)
    {
        $engineer = User::where('id', $request->engineer_id)->first();
        if (!$engineer || !$engineer->role->isEngineer()) {
            return new Response(['error' => 'Provide valid engineer id.', 'order' => $order]);
        }
        if ($this->orderStateMachine->resolveStateChange($order, OrderStateMachine::ASSIGN_OPERATION)) {
            $engineer->orders()->save($order);
            return new Response(['error' => '', 'order' => $order]);
        }
        return new Response(['error' => 'You cannot assign this order.', 'order' => $order], 400);
    }

    /**
     * @param  Order $order
     * @return \Illuminate\Http\Response
     */
    public function startProgress(Order $order)
    {
        if ($this->orderStateMachine->resolveStateChange($order, OrderStateMachine::START_PROGRESS_OPERATION)) {
            return new Response(['error' => '', 'order' => $order]);
        }
        return new Response(['error' => 'You cannot start this order.', 'order' => $order], 400);
    }

    /**
     * @param  Order $order
     * @return \Illuminate\Http\Response
     */
    public function resolve(Order $order)
    {
        if ($this->orderStateMachine->resolveStateChange($order, OrderStateMachine::RESOLVE_OPERATION)) {
            return new Response(['error' => '', 'order' => $order]);
        }
        return new Response(['error' => 'You cannot resolve this order.', 'order' => $order], 400);
    }

    /**
     * @param  Order $order
     * @return \Illuminate\Http\Response
     */
    public function close(Order $order)
    {
        if ($this->orderStateMachine->resolveStateChange($order, OrderStateMachine::CLOSE_OPERATION)) {
            return new Response(['error' => '', 'order' => $order]);
        }
        return new Response(['error' => 'You cannot close this order.', 'order' => $order], 400);
    }

    /**
     * @param  Order $order
     * @return \Illuminate\Http\Response
     */
    public function reopen(Order $order)
    {
        if ($this->orderStateMachine->resolveStateChange($order, OrderStateMachine::REOPEN_OPERATION)) {
            return new Response(['error' => '', 'order' => $order]);
        }
        return new Response(['error' => 'You cannot resolve this order.', 'order' => $order], 400);
    }
}
