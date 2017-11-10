import React from "react";

// RecipeList renders a bootstrap list item
export const SchoolList = props => 
	<div>
	<h2>Great Schools! Data</h2>
	<table className='table table-striped'>
	<thead>
      <tr>
        <th>School Name</th>
        <th>Type</th>
        <th>Address</th>
        <th>Grade Range</th>
        <th>Phone</th>
        <th>Stats</th>
        <th>Ratings</th>
        <th>Reviews</th>
	  </tr>
    </thead>
    	<tbody>
    	{props.children}
    	</tbody>
    </table>
    </div>