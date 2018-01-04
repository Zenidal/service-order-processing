const mapOrder = (responseOrder) => {
    return {
        id: responseOrder.id,
        companyId: responseOrder.company_branch.company.id,
        localityId: responseOrder.company_branch.address.locality.id,
        addressId: responseOrder.company_branch.address.id,
        description: responseOrder.description,
        status: responseOrder.status,
        statusName: responseOrder.statusName,
        companyName: responseOrder.company_branch.company.name,
        countryName: responseOrder.company_branch.address.locality.country.name,
        localityName: responseOrder.company_branch.address.locality.name,
        engineerId: responseOrder.engineer && responseOrder.engineer.id ? responseOrder.engineer.id : '',
        engineerName: responseOrder.engineer && responseOrder.engineer.name ? responseOrder.engineer.name : '',
        ownerName: responseOrder.owner.name,
        exactAddress: responseOrder.company_branch.address.exact_address,
        createdAt: responseOrder.created_at,
    }
};

const mapOrderStatusHistory = (responseStatusHistory) => {
    return {
        id: responseStatusHistory.id,
        orderId: responseStatusHistory.order_id,
        userId: responseStatusHistory.user_id,
        userName: responseStatusHistory.user.name,
        fromStatus: responseStatusHistory.from_status,
        fromStatusName: responseStatusHistory.fromStatusName,
        toStatus: responseStatusHistory.to_status,
        toStatusName: responseStatusHistory.toStatusName,
        comment: responseStatusHistory.comment,
        createdAt: responseStatusHistory.created_at
    };
};

export {mapOrder, mapOrderStatusHistory};