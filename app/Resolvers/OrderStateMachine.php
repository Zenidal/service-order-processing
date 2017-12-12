<?php

namespace App\Resolvers;

use App\Order;

class OrderStateMachine
{
    const OPEN_STATUS = 1;
    const ASSIGNED_STATUS = 2;
    const IN_PROCESS_STATUS = 3;
    const RESOLVED_STATUS = 4;
    const CLOSED_STATUS = 5;
    const REOPENED_STATUS = 6;

    const ASSIGN_OPERATION = 'assign';
    const START_PROGRESS_OPERATION = 'start_progress';
    const RESOLVE_OPERATION = 'resolve';
    const CLOSE_OPERATION = 'close';
    const REOPEN_OPERATION = 'reopen';

    private $statusChanges = [
        self::ASSIGN_OPERATION => [
            'beginStatuses' => [self::OPEN_STATUS, self::REOPENED_STATUS, self::ASSIGNED_STATUS],
            'endStatus' => self::ASSIGNED_STATUS
        ],
        self::START_PROGRESS_OPERATION => [
            'beginStatuses' => [self::ASSIGNED_STATUS],
            'endStatus' => self::IN_PROCESS_STATUS
        ],
        self::RESOLVE_OPERATION => [
            'beginStatuses' => [self::IN_PROCESS_STATUS],
            'endStatus' => self::RESOLVED_STATUS
        ],
        self::CLOSE_OPERATION => [
            'beginStatuses' => [self::RESOLVED_STATUS],
            'endStatus' => self::CLOSED_STATUS
        ],
        self::REOPEN_OPERATION => [
            'beginStatuses' => [self::RESOLVED_STATUS, self::CLOSED_STATUS],
            'endStatus' => self::REOPENED_STATUS
        ]
    ];

    public function resolveStateChange(Order &$order, $operationName)
    {
        $orderStatus = $order->status;
        $operation = $this->statusChanges[$operationName];
        if (in_array($orderStatus, $operation['beginStatuses'])) {
            $order->status = $operation['endStatus'];
            $order->save();
            return true;
        }
        return false;
    }
}