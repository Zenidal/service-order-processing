<?php

namespace App\Http\Controllers;

use App\Address;
use App\Company;
use App\CompanyBranch;
use App\Exceptions\OrderStateException;
use App\Locality;
use App\Order;
use App\Resolvers\OrderStateMachine;
use App\User;
use Illuminate\Auth\Access\AuthorizationException;
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
        $this->authorizeResource(Order::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = \Auth::user();
        $orders = [];
        if ($user->role->isManager()) {
            $orders = Order::all();
        }
        if ($user->role->isEngineer()) {
            $orders = Order::where('engineer_id', $user->id)->get();
        }
        if ($user->role->isCustomer()) {
            $orders = Order::where('owner_id', $user->id)->get();
        }

        return new Response(['error' => '', 'orders' => $orders]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request $request
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
        $order->owner_id = \Auth::user()->id;
        $companyBranch->orders()->save($order);
        return new Response(['error' => '', 'order' => $order]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request $request
     * @return Response
     * @throws AuthorizationException
     */
    public function createFromAddressAndCompany(Request $request)
    {
        if (!\Auth::user()->can('create', Order::class))
            throw new AuthorizationException();

        /** @var Validator $validator */
        $validator = Validator::make($request->all(), [
            'description' => 'required',
            'exact_address' => 'required',
            'company_id' => 'numeric|required',
            'locality_id' => 'numeric|required',
            'address_id' => 'numeric|required'
        ]);
        if ($validator->fails()) {
            return new Response(['error' => $validator->errors()->all(), 'order' => $request->all()], Response::HTTP_BAD_REQUEST);
        }
        if (!($locality = Locality::find($request->locality_id))) {
            return new Response(['error' => "Locality with id {$request->locality_id} not found.", 'order' => $request], Response::HTTP_BAD_REQUEST);
        }
        if (!($company = Company::find($request->company_id))) {
            return new Response(['error' => "Company with id {$request->company_id} not found.", 'order' => $request], Response::HTTP_BAD_REQUEST);
        }

        $address = null;
        if (!($request->address_id && $address = Address::find($request->address_id))) {
            $address = new Address();
            $address->exact_address = $request->exact_address;
            $locality->addresses()->save($address);
        }

        $companyBranch = null;
        if (!($companyBranch = CompanyBranch
            ::where('company_id', '=', $company->id)
            ->where('address_id', '=', $address->id)
            ->first())) {
            $companyBranch = new CompanyBranch();
            $companyBranch->address_id = $address->id;
            $company->companyBranches()->save($companyBranch);
        }

        $order = new Order();
        $order->description = $request->description;
        $order->status = OrderStateMachine::OPEN_STATUS;
        $order->owner_id = \Auth::user()->id;
        $companyBranch->orders()->save($order);

        return new Response(['error' => '', 'order' => $order]);
    }

    /**
     * Edit a resource.
     *
     * @param Order $order
     * @param  Request $request
     * @return Response
     * @throws AuthorizationException
     */
    public function editFromAddressAndCompany(Order $order, Request $request)
    {
        if (!\Auth::user()->can('update', $order))
            throw new AuthorizationException();

        /** @var Validator $validator */
        $validator = Validator::make($request->all(), [
            'description' => 'required',
            'exact_address' => 'required',
            'company_id' => 'numeric|required',
            'locality_id' => 'numeric|required',
            'address_id' => 'numeric|required'
        ]);
        if ($validator->fails()) {
            return new Response(['error' => $validator->errors()->all(), 'order' => $request->all()], Response::HTTP_BAD_REQUEST);
        }
        if (!($locality = Locality::find($request->locality_id))) {
            return new Response(['error' => "Locality with id {$request->locality_id} not found.", 'order' => $request], Response::HTTP_BAD_REQUEST);
        }
        if (!($company = Company::find($request->company_id))) {
            return new Response(['error' => "Company with id {$request->company_id} not found.", 'order' => $request], Response::HTTP_BAD_REQUEST);
        }

        $addressToDelete = null;
        $companyBranchToDelete = null;

        $address = null;
        if (!($request->address_id && $address = Address::find($request->address_id))) {
//            $addressToDelete = $order->companyBranch->address;

            $address = new Address();
            $address->exact_address = $request->exact_address;
            $locality->addresses()->save($address);
        } else {
            $address->exact_address = $request->exact_address;
            $address->save();
        }

        $companyBranch = null;
        if (!($companyBranch = CompanyBranch
            ::where('company_id', '=', $company->id)
            ->where('address_id', '=', $address->id)
            ->first())) {
//            $companyBranchToDelete = $order->companyBranch;

            $companyBranch = new CompanyBranch();
            $companyBranch->address_id = $address->id;
            $company->companyBranches()->save($companyBranch);
        }

        $order->description = $request->description;
        $companyBranch->orders()->save($order);

//        if($companyBranchToDelete) $companyBranchToDelete->forceDelete();
//        if($addressToDelete) $addressToDelete->forceDelete();

        return new Response(['error' => '', 'order' => $order->refresh()]);
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
     * @param  Request $request
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
        return new Response(['error' => '', 'order' => $order->refresh()]);
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
            return new Response(['error' => 'Provide valid engineer id.', 'order' => $order], Response::HTTP_BAD_REQUEST);
        }
        try {
            $orderHistory = $this->orderStateMachine->resolveStateChange($order, OrderStateMachine::ASSIGN_OPERATION);
            $engineer->engineerOrders()->save($order);
            if ($request->comment) {
                $orderHistory->comment = $request->comment;
                $orderHistory->save();
            }
            return new Response(['error' => '', 'order' => $order]);
        } catch (OrderStateException $exception) {
            return new Response(['error' => 'You cannot assign this order.', 'order' => $order], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param  Order $order
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function startProgress(Order $order, Request $request)
    {
        try {
            $orderHistory = $this->orderStateMachine->resolveStateChange($order, OrderStateMachine::START_PROGRESS_OPERATION);
            if ($request->comment) {
                $orderHistory->comment = $request->comment;
                $orderHistory->save();
            }
            return new Response(['error' => '', 'order' => $order]);
        } catch (OrderStateException $exception) {
            return new Response(['error' => 'You cannot start this order.', 'order' => $order], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param  Order $order
     * @param Request $request
     * @return Response
     */
    public function resolve(Order $order, Request $request)
    {
        try {
            $orderHistory = $this->orderStateMachine->resolveStateChange($order, OrderStateMachine::RESOLVE_OPERATION);
            if ($request->comment) {
                $orderHistory->comment = $request->comment;
                $orderHistory->save();
            }
            return new Response(['error' => '', 'order' => $order]);
        } catch (OrderStateException $exception) {
            return new Response(['error' => 'You cannot resolve this order.', 'order' => $order], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param  Order $order
     * @param Request $request
     * @return Response
     */
    public function close(Order $order, Request $request)
    {
        try {
            $orderHistory = $this->orderStateMachine->resolveStateChange($order, OrderStateMachine::CLOSE_OPERATION);
            if ($request->comment) {
                $orderHistory->comment = $request->comment;
                $orderHistory->save();
            }
            return new Response(['error' => '', 'order' => $order]);
        } catch (OrderStateException $exception) {
            return new Response(['error' => 'You cannot close this order.', 'order' => $order], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param  Order $order
     * @param Request $request
     * @return Response
     */
    public function reopen(Order $order, Request $request)
    {
        if (!$request->comment) {
            return new Response(['error' => 'Provide cause of reopening.', 'order' => $order], Response::HTTP_BAD_REQUEST);
        }
        try {
            $orderHistory = $this->orderStateMachine->resolveStateChange($order, OrderStateMachine::REOPEN_OPERATION);
            if ($request->comment) {
                $orderHistory->comment = $request->comment;
                $orderHistory->save();
            }
            return new Response(['error' => '', 'order' => $order]);
        } catch (OrderStateException $exception) {
            return new Response(['error' => 'You cannot resolve this order.', 'order' => $order], Response::HTTP_BAD_REQUEST);
        }
    }
}
