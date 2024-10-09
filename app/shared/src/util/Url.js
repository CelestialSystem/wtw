Ext.define('MyApp.util.Url', {
    alternateClassName: ['URLS'],
    singleton: true,

    url: (
        function () {
            var base = 'https://wtw-backend.csi-infra.com/',
                api = base + 'api/',
                person = api + 'person/',
                dropdown = api + 'dropdowns/',
                file = api + 'files/';

            return {
                login: base + 'login',
                person: person,
                api: api,
                navigationtree: api + 'navigationtree/examplenavigationtree',
                getFileHashes: file + 'listfilehash',

                division: dropdown + 'division',
                location: dropdown + 'location',
                union: dropdown + 'union',
                lineOfBusiness: dropdown + 'lineOfBusiness',
                country: dropdown + 'country',
                honorificcode: dropdown + 'honorificcode',
                statuscade: dropdown + 'statuscade',
                slaindicator: dropdown + 'slaindicator',
                casetype: dropdown + 'casetype',
                currentcaseteamassignment: dropdown + 'currentcaseteamassignment',
                done: dropdown + 'done',
                consultingreview: dropdown + 'consultingreview',
                editorialreview: dropdown + 'editorialreview',
                SERPPreRetirementOpFormElection: dropdown + 'SERPPreRetirementOpFormElection',
                married: dropdown + 'married',
                futurecontributiontype: dropdown + 'futurecontributiontype',
                electionstatus: dropdown + 'electionstatus',
                pensionmiscGroup: dropdown + 'pensionmiscGroup',
                pensionplan: dropdown + 'pensionplan',
                pensionstatuscode: dropdown + 'pensionstatuscode',
                SSSEligible: dropdown + 'SSSEligible',
                uniontransferflag: dropdown + 'uniontransferflag',
                viewedbyparticipant: dropdown + 'viewedbyparticipant',
                eligible: dropdown + 'eligible',
                compclass: dropdown + 'compclass',
                SERPPreRetirementOpFormElection: dropdown + 'SERPPreRetirementOpFormElection',
                married: dropdown + 'married',
                futurecontributiontype: dropdown + 'futurecontributiontype',
                electionstatus: dropdown + 'electionstatus',
                pensionmiscGroup: dropdown + 'pensionmiscGroup',
                pensionplan: dropdown + 'pensionplan',
                pensionstatuscode: dropdown + 'pensionstatuscode',
                SSSEligible: dropdown + 'SSSEligible',
                uniontransferflag: dropdown + 'uniontransferflag',
                viewedbyparticipant: dropdown + 'viewedbyparticipant',
                eligible: dropdown + 'eligible',
                compclass: dropdown + 'compclass',
                state: dropdown + 'state',
                getAdvanceSearchTables: dropdown + 'employeeadvancesearchtables',
                withholdpaymentchangesfromtrusteefile: dropdown + 'withholdpaymentchangesfromtrusteefile',
                withholdpaymentstartfromtrusteefile: dropdown + 'withholdpaymentstartfromtrusteefile',
                pensionplanbenefittype: dropdown + 'pensionplanbenefittype',
                frequencyCodeinbenefitpayment: dropdown + 'frequencyCodeinbenefitpayment',
                paymentaddress: dropdown + 'paymentaddress',
                checkdeliverymethod: dropdown + 'checkdeliverymethod',
                directdepositaccounttype: dropdown + 'directdepositaccounttype',
                rolloverdistributiontype: dropdown + 'rolloverdistributiontype',
                federaltaxmethod: dropdown + 'federaltaxmethod',
                federalfilingStatusCode: dropdown + 'federalfilingStatusCode',
                statetaxtaxingState: dropdown + 'statetaxtaxingState',
                statetaxmethod: dropdown + 'statetaxmethod',
                statefilingstatuscode: dropdown + 'statefilingstatuscode',
                nonresidentalienflag: dropdown + 'nonresidentalienflag',
                weightbenformreceived: dropdown + 'weightbenformreceived',
                bankingandtaxupdateOccurred: dropdown + 'bankingandtaxupdateOccurred',

                listFile: file + 'listfiles',
                getFile: file + 'getfile',
                uploadFile: file + 'uploadfile',

                createcases: person + 'createcases',
                Createemployeeservicehistory: person + 'Createemployeeservicehistory',
                createemployeeearning: person + 'createemployeeearning',
                createperson: person + 'createperson',
                createemployeepensionhistory: person + 'createemployeepensionhistory',
                createemployeeaddress: person + 'createemployeeaddress',
                createemployeepensionmisc: person + 'createemployeepensionmisc',
                createemployeeplanbeneficiary: person + 'createemployeeplanbeneficiary',
                createadvancesearchcriteria: person + 'createadvancesearchcriteria',
                createemployeebenefitpayment: person + 'createemployeebenefitpayment',
                createemployeecashbalance: person + 'createemployeecashbalance',

                getemployeesearch: person + 'getemployeesearch',
                getemployeebyId: person + 'getemployee',
                getemployeepersonal: person + 'getemployeepersonal',
                getemployeemiscellaneous: person + 'getemployeemiscellaneous',
                getmostrecentsearchemployee: person + 'getmostrecentsearchemployee',
                getpersoncases: person + 'getcases',
                getpersoncase: person + 'getcase',
                getpersoncasesearch: person + 'getcasesearch',
                getnavigationtreehash: api + 'hashes/gethash?endpoint=examplenavigationtree',
                getemployeeearnings: person + 'getemployeeearnings',
                getemployeeEarning: person + 'getemployeeEarning',
                getemployeeservicehistorys: person + 'getemployeeservicehistorys',
                getemployeeservicehistory: person + 'getemployeeservicehistory',
                getemployeepensionhistory: person + 'getemployeepensionhistory',
                getemployeepensionhistorybyID: person + 'getemployeepensionhistorybyID',
                getemployeeplanbeneficiarybyID: person + 'getemployeeplanbeneficiarybyID',
                getemployeeaddresses: person + 'getemployeeaddresses',
                getemployeeaddress: person + 'getemployeeaddress',
                getemployeerelations: person + 'getemployeerelations',
                Getadvancesearchrecords: person + 'Getadvancesearchrecords',
                getTableColumnNames: person + 'getTablecolumnsname',
                getMatchingOperator: person + 'getmatchingoperator',
                getAdvanceSearchRecords: person + 'Getadvancesearchrecords',
                getemployeepensionmisc: person + 'getemployeepensionmisc',
                getemployeeplanbeneficiary: person + 'getemployeeplanbeneficiary',
                getemployeeregression: person + 'getemployeeregression',
                getAdvanceSearchTables: dropdown + 'employeeadvancesearchtables',
                getadvancesearchcriteria: person + 'getadvancesearchcriteria',
                getemployeebenefitpayment: person + 'getemployeebenefitpayment',
                getemployeebenefitpaymentbyid: person + 'getemployeebenefitpaymentbyid',
                getemployeecashbalance: person + 'getemployeecashbalance',
                getemployeecashbalancebyid: person + 'getemployeecashbalancebyid',

                updateemployeepersonal: person + 'updateemployeepersonal',
                updateemployeemiscellaneous: person + 'updateemployeemiscellaneous',
                updateemployee: person + 'updateemployee',
                updatecases: person + 'updatecases',
                updateemployeeearning: person + 'updateemployeeearning',
                updateemployeeServiceHistory: person + 'updateemployeeServiceHistory',
                updateemployeerelation: person + 'updateemployeerelation',
                updateemployeeaddress: person + 'updateemployeeaddress',
                updateemployeepensionhistory: person + 'updateemployeepensionhistory',
                updateemployeeplanbeneficiary: person + 'updateemployeeplanbeneficiary',
                updatepersonmiscellaneous: person + 'updatepersonmiscellaneous',
                updateemployeeregression: person + 'updateemployeeregression',
                updateadvancesearchcriteria: person + 'updateadvancesearchcriteria',
                updateemployeepensionmisc: person + 'updateemployeepensionmisc',
                updateemployeebenefitpayment: person + 'updateemployeebenefitpayment',
                updateemployeecashbalance: person + 'updateemployeecashbalance',

                deleteemployeeaddress: person + 'deleteemployeeaddress',
                deleteemployeeearning: person + 'deleteemployeeearning',
                deleteemployeecase: person + 'deleteemployeecase',
                deleteemployeeservicehistory: person + 'deleteemployeeservicehistory',
                deleteemployeeregression: person + 'deleteemployeeregression',
                deleteemployeepensionhistory: person + 'deleteemployeepensionhistory',
                deleteemployeeplanbeneficiary: person + 'deleteemployeeplanbeneficiary',
                deleteadvancesearchcriteria: person + 'deleteadvancesearchcriteria',
                deleteemployeepensionmisc: person + 'deleteemployeepensionmisc',
                deleteemployeebenefitpayment: person + 'deleteemployeebenefitpayment',
                deleteemployeecashbalance: person + 'deleteemployeecashbalance'

            }
        }
    )(),

});
