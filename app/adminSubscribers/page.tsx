'use client';

import { useEffect, useState } from "react";

interface Subscriber {
    Id: string;
    Email: string;
    DailyNewsletter: boolean;
    AdvertisingUpdates: boolean;
    WeekinReview: boolean;
    EventUpdates: boolean;
    StartupsWeekly: boolean;
    Podcasts: boolean;
}

export default function AdminSubscribers() {  
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [status, setStatus] = useState({ error: '', success: '' });
  const [showModal, setShowModal] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch("https://subscriptionprovider--silicon.azurewebsites.net/api/GetAllSubscribers?code=RtJjagypPMgK8_6gezO1G54MG_2UT3VkJO4HA45RhH7zAzFuWYSz6w%3D%3D", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSubscribers(data);
          setFilteredSubscribers(data);
        } else {
          setStatus(prevStatus => ({ ...prevStatus, error: 'Cannot find any subscribers, please try again' }));
        }
      } catch (error) {
        setStatus(prevStatus => ({ ...prevStatus, error: 'Cannot find any subscribers, please try again' }));
        console.error("Error fetching subscribers:", error);
      }
    };

    fetchSubscribers();
  }, []);

  const handleChange = async (subscriber: Subscriber, field: keyof Subscriber, value: boolean) => {
    const updatedSubscriber = { ...subscriber, [field]: value };
    try {
      const response = await fetch("https://subscriptionprovider--silicon.azurewebsites.net/api/UpdateSubscriberInfo?code=CB_eFFDS-Uib3uXi9oZEdO3jzz6HV1enTgBMLH0E-18CAzFudMfCHg%3D%3D", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSubscriber),
      });

      if (response.ok) {
        const updatedSubscribers = subscribers.map(sub => sub.Id === subscriber.Id ? updatedSubscriber : sub);
        setSubscribers(updatedSubscribers);
        filterSubscribers(updatedSubscribers, searchQuery);
        setStatus(prevStatus => ({ ...prevStatus, success: 'Subscriber updated successfully' }));
      } else {
        setStatus(prevStatus => ({ ...prevStatus, error: 'Failed to update subscriber, please try again' }));
        console.error("Failed to update subscriber:", response.statusText);
      }
    } catch (error) {
      setStatus(prevStatus => ({ ...prevStatus, error: 'Error updating subscriber, please try again' }));
      console.error("Error updating subscriber:", error);
    }
  };

  const handleDelete = async () => {
    if (emailToDelete) {
      try {
        const response = await fetch("https://subscriptionprovider--silicon.azurewebsites.net/api/Unsubscribe?code=EqJJ2sEFas7vYLtEAhTiKFPqQXZEbW-d5PZS-qQWEL82AzFufxQg2Q%3D%3D", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Email: emailToDelete }),
        });

        if (response.ok) {
          setStatus(prevStatus => ({ ...prevStatus, success: 'Subscriber deleted successfully' }));
          const updatedSubscribers = subscribers.filter(subscriber => subscriber.Email !== emailToDelete);
          setSubscribers(updatedSubscribers);
          filterSubscribers(updatedSubscribers, searchQuery);
        } else {
          setStatus(prevStatus => ({ ...prevStatus, error: 'Failed to delete subscriber, please try again' }));
          console.error("Failed to delete subscriber:", response.statusText);
        }
      } catch (error) {
        setStatus(prevStatus => ({ ...prevStatus, error: 'Failed to delete subscriber, please try again' }));
        console.error("Error deleting subscriber:", error);
      }
    }
    setShowModal(false);
  };

  const handleShowModal = (email: string) => {
    setEmailToDelete(email);
    setShowModal(true);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterSubscribers(subscribers, query);
  };

  const filterSubscribers = (subscribers: Subscriber[], query: string) => {
    setFilteredSubscribers(
      subscribers.filter(subscriber =>
        subscriber.Email.toLowerCase().includes(query)
      )
    );
  };

  if (!subscribers.length) return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <main>
      {status.error && (
        <div className="alert alert-danger" role="alert">
          {status.error}
        </div>
      )}
      {status.success && (
        <div className="alert alert-success" role="alert">
          {status.success}
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin Subscribers</h1>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by email"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="table-responsive" style={{ maxHeight: "80vh" }}>
        <table className="table table-striped">
          <thead className="bg-white" style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th>Email</th>
              <th>Daily Newsletter</th>
              <th>Advertising Updates</th>
              <th>Week in Review</th>
              <th>Event Updates</th>
              <th>Startups Weekly</th>
              <th>Podcasts</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscribers.map(subscriber => (
              <tr key={subscriber.Id}>
                <td>{subscriber.Email}</td>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={subscriber.DailyNewsletter}
                      onChange={(e) => handleChange(subscriber, 'DailyNewsletter', e.target.checked)}
                    />
                  </div>
                </td>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={subscriber.AdvertisingUpdates}
                      onChange={(e) => handleChange(subscriber, 'AdvertisingUpdates', e.target.checked)}
                    />
                  </div>
                </td>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={subscriber.WeekinReview}
                      onChange={(e) => handleChange(subscriber, 'WeekinReview', e.target.checked)}
                    />
                  </div>
                </td>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={subscriber.EventUpdates}
                      onChange={(e) => handleChange(subscriber, 'EventUpdates', e.target.checked)}
                    />
                  </div>
                </td>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={subscriber.StartupsWeekly}
                      onChange={(e) => handleChange(subscriber, 'StartupsWeekly', e.target.checked)}
                    />
                  </div>
                </td>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={subscriber.Podcasts}
                      onChange={(e) => handleChange(subscriber, 'Podcasts', e.target.checked)}
                    />
                  </div>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleShowModal(subscriber.Email)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`modal mt-5 fade ${showModal ? 'show d-block' : 'd-none'}`} tabIndex={-1} role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete the subscriber with email: <strong>{emailToDelete}</strong>?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
