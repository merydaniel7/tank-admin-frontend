import { useEffect, useState } from "react"
import { getFixedCostsByMonth, saveFixedCosts } from "services/FixedCostsService";

export default function FixedCostForm(props) {
  const [disable, setDisable] = useState("disabled");
  const [isFixedCostLoaded, setIsFixedCostLoaded] = useState(false);
  const [formValue, setFormValue] = useState({
    wages: 0,
    wageContribution: 0,
    evContribution: 0,
    packagingPrice: 0,
    ahl: 0,
    contabo: 0,
    huszarBence: 0,
    baranyArpad: 0,
    accountant: 0,
    audit: 0,
    businessTax: 0,
    corporateTax: 0,
    corporateTax9: 0,
    vat: 0,
    constructionTax: 0,
    overhead: 0,
    other: 0,
    unas: 0,
    bankAccountCost: 0,
    carInsurance: 0,
    creditCardCommission: 0,
    phoneBill: 0,    
    bonuses: 0,
    plus1: 0,
    plus2: 0,
    plus3: 0,
    plus4: 0,
    plus5: 0,
    plus6: 0,
    plus7: 0
  });

  useEffect(() => {
    getFixedCostsByMonth(props.month).then((res) =>{
      if (res.data !== "Not found!") {
        setFormValue(res.data);
      } else {
        setFormValue({
          wages: 0,
          wageContribution: 0,
          evContribution: 0,
          packagingPrice: 0,
          ahl: 0,
          contabo: 0,
          huszarBence: 0,
          baranyArpad: 0,
          accountant: 0,
          audit: 0,
          businessTax: 0,
          corporateTax: 0,
          corporateTax9: 0,
          vat: 0,
          constructionTax: 0,
          overhead: 0,
          other: 0,
          unas: 0,
          bankAccountCost: 0,
          carInsurance: 0,
          creditCardCommission: 0,
          phoneBill: 0,          
          bonuses: 0,
          plus1: 0,
          plus2: 0,
          plus3: 0,
          plus4: 0,
          plus5: 0,
          plus6: 0,
          plus7: 0
        });
      }
    })
    .catch((error) => {
      console.error(error)
    });

    setIsFixedCostLoaded(true);
  }, [props.month])
    

  const handleSaveButton = (e) => {
    e.preventDefault();
    console.log(formValue);
    const editButton = document.getElementById("edit");
    const saveButton = document.getElementById("save");
    saveButton.classList.remove("bg-red-700");
    saveButton.classList.add("bg-grey");
    saveButton.classList.add("cursor-not-allowed")
    editButton.classList.remove("bg-grey");
    editButton.classList.add("bg-emerald-500");
    setDisable("disabled")

    saveFixedCosts(formValue).then(res => {
      console.log(res.data)
    }).catch((error) => {
      console.error(error)
    });

  }

  const handleEditButton = (e) => {
    e.preventDefault();
    const editButton = document.getElementById("edit");
    if (editButton.classList.contains("bg-emerald-500")) {
      editButton.classList.remove("bg-emerald-500");
      editButton.classList.add("bg-grey");
    } else {
      editButton.classList.add("bg-emerald-500");
      editButton.classList.remove("bg-grey");
    }

    const saveButton = document.getElementById("save");
    if (saveButton.classList.contains("bg-grey")) {
      saveButton.classList.remove("bg-grey");
      saveButton.classList.remove("cursor-not-allowed")
      saveButton.classList.add("bg-red-700");
    } else {
      saveButton.classList.remove("bg-red-700");
      saveButton.classList.add("bg-grey");
      saveButton.classList.add("cursor-not-allowed")
    }
    setDisable(disable === "" ? "disabled" : "")
  }

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");;
    setFormValue({
      ...formValue,
      [e.target.name]: parseInt(value)
    });
  };

  return (
    isFixedCostLoaded ? (
      <>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="wages">
              Wages
            </label>
            <input type="number" name="wages" onChange={handleChange} value={formValue.wages} disabled={disable}  className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="wages"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="wage-contribution">
              Wage contribution
            </label>
            <input type="number"  name="wageContribution"  onChange={handleChange} value={formValue.wageContribution} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="wage-contribution"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="ev-contribution">
              EV contribution
            </label>
            <input type="number"  name="evContribution"  onChange={handleChange} value={formValue.evContribution} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="ev-contribution"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="packaging-price">
              Packaging price
            </label>
            <input type="number"  name="packagingPrice"  onChange={handleChange} value={formValue.packagingPrice} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="packaging-price"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="ahl">
              AHL
            </label>
            <input type="number"  name="ahl"  onChange={handleChange} value={formValue.ahl} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="ahl"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="contabo">
              Contabo
            </label>
            <input type="number"  name="contabo"  onChange={handleChange} value={formValue.contabo} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="contabo"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="huszar-bence">
              Huszár Bence
            </label>
            <input type="number"  name="huszarBence"  onChange={handleChange} value={formValue.huszarBence} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="huszar-bence"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="barany-arpad">
              Bárány Árpád
            </label>
            <input type="number"  name="baranyArpad"  onChange={handleChange} value={formValue.baranyArpad} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="barany-arpad"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="accountant">
              Accountant
            </label>
            <input type="number"  name="accountant"  onChange={handleChange} value={formValue.accountant} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="accountant"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="audit">
              Audit
            </label>
            <input type="number"  name="audit"  onChange={handleChange} value={formValue.audit} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="audit"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="business-tax">
              Business tax
            </label>
            <input type="number"  name="businessTax"  onChange={handleChange} value={formValue.businessTax} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="business-tax"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="corporate-tax">
              Corporate tax
            </label>
            <input type="number"  name="corporateTax"  onChange={handleChange} value={formValue.corporateTax} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="corporate-tax"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="corporate-tax-9">
              Corporate tax 9%
            </label>
            <input type="number"  name="corporateTax9"  onChange={handleChange} value={formValue.corporateTax9} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="corporate-tax-9"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="vat">
              VAT
            </label>
            <input type="number"  name="vat"  onChange={handleChange} value={formValue.vat} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="vat"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="construction-tax">
              Construction tax
            </label>
            <input type="number"  name="constructionTax"  onChange={handleChange} value={formValue.constructionTax} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="construction-tax"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="overhead">
              Overhead
            </label>
            <input type="number"  name="overhead"  onChange={handleChange} value={formValue.overhead} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="overhead"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="other">
              Other
            </label>
            <input type="number"  name="other"  onChange={handleChange} value={formValue.other} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="other"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="unas">
              UNAS
            </label>
            <input type="number"  name="unas"  onChange={handleChange} value={formValue.unas} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="unas"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="bank-account-cost">
              Bank account cost
            </label>
            <input type="number"  name="bankAccountCost"  onChange={handleChange} value={formValue.bankAccountCost} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="bank-account-cost"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="car-insurance">
              Car insurance
            </label>
            <input type="number"  name="carInsurance"  onChange={handleChange} value={formValue.carInsurance} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="car-insurance"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="credit-card-commission">
              Credit card commission
            </label>
            <input type="number"  name="creditCardCommission"  onChange={handleChange} value={formValue.creditCardCommission} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="credit-card-commission"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone-bill">
              Phone bill
            </label>
            <input type="number"  name="phoneBill"  onChange={handleChange} value={formValue.phoneBill} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="phone-bill"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="bonuses">
              Bonuses
            </label>
            <input type="number"  name="bonuses"  onChange={handleChange} value={formValue.bonuses} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="bonuses"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="plus-1">
              Plus 1
            </label>
            <input type="number"  name="plus1"  onChange={handleChange} value={formValue.plus1} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="plus-1"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="plus-2">
              Plus 2
            </label>
            <input type="number"  name="plus2"  onChange={handleChange} value={formValue.plus2} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="plus-2"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="plus-3">
              Plus 3
            </label>
            <input type="number"  name="plus3"  onChange={handleChange} value={formValue.plus3} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="plus-3"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="plus-4">
              Plus 4
            </label>
            <input type="number"  name="plus4"  onChange={handleChange} value={formValue.plus4} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="plus-4"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="plus-5">
              Plus 5
            </label>
            <input type="number"  name="plus5"  onChange={handleChange} value={formValue.plus5} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="plus-5"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="plus-6">
              Plus 6
            </label>
            <input type="number"  name="plus6"  onChange={handleChange} value={formValue.plus6} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="plus-6"/>
          </div>
          <div className="md:w-1/12 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="plus-7">
              Plus 7
            </label>
            <input type="number"  name="plus7"  onChange={handleChange} value={formValue.plus7} disabled={disable} className="appearance-none block bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="plus-7"/>
          </div>
        </div>


        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button id="edit" onClick={(e) => handleEditButton(e)}        
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-500"
          >
            <i className="far fa-edit"> Edit</i>
          </button>
          <button id="save" disabled={disable} onClick={(e) => handleSaveButton(e)}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-grey cursor-not-allowed"
          >
            <i className="far fa-save"> Save</i>
          </button>
        </div>  
    </>) :
          (<>
            <div className="flex flex-wrap mt-4">
              <div className="w-full xl:w-4/12 px-4">
                Loading...
              </div>      
            </div>
          </>)
  )

}