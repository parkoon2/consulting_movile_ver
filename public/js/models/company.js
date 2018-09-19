const CompanyModel = (() => {
    let self
    function CompanyController(companies) {
        self = this
        this.companies = companies || []
    }

    let _prototype = CompanyController.prototype

    _prototype.getCompanies = () => {
        return self.companies
    }

    _prototype.setCompanies = (companies) => {
        self.companies = companies
    }

    return new CompanyController()
})()
