'use strict';

export default class ListingsList extends React.Component {
  getBody = () => {
    const rows = [];
    this.props.listingsList.forEach(listing => {
      rows.push(
        <tr key={listing.id}>
          <td>{listing.title}</td>
          <td>{listing.host_name}</td>
          <td>{listing.neighborhood}</td>
          <td>{listing.neighborhood_group}</td>
          <td>{listing.room_type}</td>
          <td>{listing.price}</td>
          <td>{listing.minimum_nights}</td>
          <td>{listing.number_of_reviews}</td>
          <td>
            Lat: {listing.latitude}, Lon: {listing.longitude}
          </td>
        </tr>
      );
    });
    return rows;
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Listing Title</th>
            <th>Host Name</th>
            <th>Neighborhood</th>
            <th>Neighborhood Area</th>
            <th>Room Type</th>
            <th>Price</th>
            <th>Minimum Nights</th>
            <th>Number of Reviews</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>{this.getBody()}</tbody>
      </table>
    );
  }
}
