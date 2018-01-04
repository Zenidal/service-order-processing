const mapOrder = (responseOrder) => {
    return {
        id: responseOrder.id,
        companyId: responseOrder.company_branch.company.id,
        localityId: responseOrder.company_branch.address.locality.id,
        addressId: responseOrder.company_branch.address.id,
        description: responseOrder.description,
        status: responseOrder.status,
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

export {mapOrder};