"use client"

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
export default function adminSubscribers() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [status, setStatus] = useState({ error: '', success: '' });
    const [showModal, setShowModal] = useState(false);
    const [emailToDelete, setEmailToDelete] = useState<string | null>(null);
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
            } else {
            setStatus({ ...status, error: 'Cannot find any subscribers, please try again' });
            }
        } catch (error) {
            setStatus({ ...status, error: 'Cannot find any subscribers, please try again' });
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
            setSubscribers(subscribers.map(sub => sub.Id === subscriber.Id ? updatedSubscriber : sub));
            setStatus({ ...status, success: 'subscriber updated successfully' });
        } else {
            setStatus({ ...status, error: 'Failed to update subscriber, please try again' });
            console.error("Failed to update subscriber:", response.statusText);
        }
        } catch (error) {
        setStatus({ ...status, error: 'Error updating subscriber, please try again' });
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
              setStatus({ ...status, success: 'Subscriber deleted successfully' });
              setSubscribers(subscribers.filter(subscriber => subscriber.Email !== emailToDelete));
            } else {
              setStatus({ ...status, error: 'Failed to delete subscriber, please try again' });
              console.error("Failed to delete subscriber:", response.statusText);
            }
          } catch (error) {
            setStatus({ ...status, error: 'Failed to delete subscriber, please try again' });
            console.error("Error deleting subscriber:", error);
          }
        }
        setShowModal(false);
      };

    const handleShowModal = (email: string) => {
        setEmailToDelete(email);
        setShowModal(true);
    };

    if (!subscribers) return (
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
        <h1 className="mb-4">Admin Subscribers</h1>
        <table className="table table-striped">
            <thead>
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
            {subscribers.map(subscriber => (
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
  