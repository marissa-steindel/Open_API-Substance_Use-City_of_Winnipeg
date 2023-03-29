  /*----------------

     Assignment 4
     Name: Marissa Steindel
     Date: July 7, 2022
     Description: Asynchronous Javascript and XML

 -------------------*/

// load page, execute load function
document.addEventListener("DOMContentLoaded", load);

// listen for click event, execute search function
function load()
{
    clearTable();
    clearFields();

    // listen for form submit button click
    document.getElementById("substanceSearch").addEventListener("click", searchDataSet);

    console.log("load executed");
}


/**
 * Query the JSON API
 * @param event
 */
function searchDataSet(e)
{
    // prevent the page from refreshing on form submit
    e.preventDefault();
    console.log("searchDataSet executing");

    // clear the table
    clearTable();

    // read in the search term
    let searchTerm = document.getElementById("searchInput").value;
    console.log(searchTerm);


    // only proceed with valid search term
    if(searchTerm != null && searchTerm != "")
    {
        // build the url query
        let fullDataSet = "https://data.winnipeg.ca/resource/6x82-bz5y.json";
        let limit = 100;

        // let customURL = fullDataSet + "?$WHERE=substance LIKE '" + searchTerm + "' &$LIMIT=100";
        let customURL = `${fullDataSet}?$WHERE=lower(substance) LIKE lower('%${searchTerm}%') &$LIMIT=${limit}&$order=dispatch_date DESC`;

        let encodedURL = encodeURI(customURL);

        console.log(customURL);
        console.log(encodedURL);

        // fetch the data
        // fetch("https://data.winnipeg.ca/resource/6x82-bz5y.json?$WHERE=substance LIKE 'Alcohol'&$LIMIT=100")
        fetch(encodedURL)
            // .then(handleErrors)
                .then(function(result)
                {
                    // Promise for parsed JSON.
                    return result.json();
                })
                    .then(function(data)
                    {
                        console.log(data.length + " results returned");
                        if(data.length == 0)
                        {
                            console.log("no results found");
                            clearFields();
                            showExplanation(data.length, searchTerm);
                        }
                        else
                        {
                            clearTable();
                            clearFields();
                            populateTable(data);
                            showExplanation(data.length, searchTerm);
                        }

                    })
                        .catch(function(error)
                            {
                                console.log(error);
                                console.log("catch - there's been an error");

                            });
    }
    else
    {
        showExplanation(null, null);
    }

}



/**
 * Populates a table with data
 * Traverses the hash and calls a function
 * at each row to populate the row.
 * @param data - JSON data
 */
function populateTable(data)
{
    // display the table headings
    document.querySelector('table').style.display = 'table';
    document.querySelector('thead').style.display = 'table-header-group';

    // get the table body element to populate
    let table = document.querySelector('tbody');

    // build the row
    // traverse the JSON hash
    for (let datum of data)
    {
        addRow(datum, table);
    }
}


/**
 * Adds a row of data to the table
 * @param datum - collection at a given index of the hash
 * @param table - reference to tbody element
 */
function addRow(datum, table)
{

    // create the table elements
    // variable to create a table row <tr>
    let row = document.createElement('tr');

    // variable to create table data <td>
    let incident_num_TD = document.createElement('td');
    let dispatch_date_TD = document.createElement('td');
    let age_TD = document.createElement('td');
    let substance_TD = document.createElement('td');


    // load the <td> innerHTML with values from the hash
    incident_num_TD.innerHTML    = datum.incident_number;
    dispatch_date_TD.innerHTML   = `${datum.dispatch_date.substring(0,10)} --- ${datum.dispatch_date.substring(11,16)}`;
    age_TD.innerHTML             = datum.age;
    substance_TD.innerHTML       = datum.substance;

    // append the <td> elements to the row
    row.appendChild(incident_num_TD);
    row.appendChild(substance_TD);
    row.appendChild(age_TD);
    row.appendChild(dispatch_date_TD);

    // append the row to the table
    table.appendChild(row);
}

/**
 * Populates the custom output summary
 * @param count - number of results returned by the query
 * @param searchTerm
 */
function showExplanation(count, searchTerm)
{
    let explanation = document.getElementById("explanation");

    if (count > 0)
    {
        explanation.innerHTML = `The <strong>${count}</strong> most recent incidents involving <strong>'${searchTerm}'</strong>.`;
    }
    else if(count == null)
    {
        explanation.innerHTML = "Please enter a valid search term.";
    }
    else
    {
        console.log(count);
        explanation.innerHTML = `No incidents involving <strong>'${searchTerm}'</strong> were found.`;
    }
}


/**
 * Clear the <tbody> element.
 */
function clearTable()
{
    let table = document.querySelector('tbody');
    table.innerHTML = '';

    document.querySelector('table').style.display = 'none';

}

/**
 * Clear the <input> elements and return focus to first field.
 */
function clearFields()
{
    document.getElementById('searchInput').value = "";
    document.getElementById('searchInput').focus();
}


function fillField()
{
    let query = document.getElementsByClassName("query").value;
    console.log(query);
}

function handleErrors(response)
{
    if (!response.ok)
    {
        throw Error(response.statusText);
    }

    console.log("status text: " + response.statusText);

    return response;
}


//     /**
//      * Handles the submit event of the form
//      * @param e  A reference to the event object
//      * @return   True if no validation errors; False if the form has
//      *          validation errors
//      */
//     function validate(e)
//     {
//         let searchTerm = document.getElementById("searchInput").value;


//         //  Determine if the form has errors
//         if(searchTerm == null || trim(searchTerm) == "")
//         {
//             console.log('DO NOT SUBMIT');

//             // Prevent the form from submitting
//             e.preventDefault();

//             // form has errors
//             return false;
//         }

//         // all input is valid
//         return true;
//     }

// }




// /**
//  * Determines if a text field element has input
//  * @param   fieldElement A text field input element object
//  * @return  True if the field contains input; False if nothing entered
//  */
// function fieldHasInput(fieldElement)
// {
//     if (fieldElement.value == null || trim(fieldElement.value) == "")
//     {
//         return false;
//     }
//     return true;
// }




// // async - function resturns a promise
// // await - javascript waits for promise to be settled before continuing execution
//  async function getJSON()
//  {
//     let results = await fetch("https://dog.ceo/api/breeds/list/all");
//     let data = await results.json();

//     let breeds = Object.keys(data.message);
//     for (let breed of breeds)
//     {
//         console.log(breed);
//     }
// }









