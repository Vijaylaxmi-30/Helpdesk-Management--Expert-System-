#include <iostream>
using namespace std;

int ticketCounter = 1000;

struct Ticket {
    int id;
    int choice;
    int users;
    bool isCritical;
    string priority;
};

string assignPriority(int users, bool critical) {
    if (critical)
        return "Critical";
    else if (users > 5)
        return "High";
    else if (users > 1)
        return "Medium";
    else
        return "Low";
}

// Function to edit ticket
void editTicket(Ticket &t) {
    int editChoice;

    cout << "\n--- Edit Ticket ---\n";
    cout << "1. Change Problem Type\n";
    cout << "2. Change Number of Users\n";
    cout << "3. Change Critical Status\n";
    cout << "Enter choice: ";
    cin >> editChoice;

    switch(editChoice) {
        case 1:
            cout << "Enter new problem type (1-4): ";
            cin >> t.choice;
            break;

        case 2:
            cout << "Enter new number of users: ";
            cin >> t.users;
            break;

        case 3:
            char ch;
            cout << "Is it critical (y/n): ";
            cin >> ch;
            t.isCritical = (ch == 'y' || ch == 'Y');
            break;

        default:
            cout << "Invalid option\n";
            return;
    }

    // Recalculate priority
    t.priority = assignPriority(t.users, t.isCritical);

    cout << "Ticket updated successfully!\n";
}

int main() {
    Ticket t;
    char criticalSystem, resolved, editOption;

    t.id = ++ticketCounter;

    cout << "===== HELP DESK EXPERT SYSTEM =====\n";
    cout << "Ticket ID: " << t.id << endl;

    cout << "\nSelect Problem Type:\n";
    cout << "1. Network Issue\n";
    cout << "2. Hardware Issue\n";
    cout << "3. Software Issue\n";
    cout << "4. Account/Login Issue\n";
    cout << "Enter choice: ";
    cin >> t.choice;

    cout << "How many users are affected? ";
    cin >> t.users;

    cout << "Is this a critical system? (y/n): ";
    cin >> criticalSystem;

    t.isCritical = (criticalSystem == 'y' || criticalSystem == 'Y');

    t.priority = assignPriority(t.users, t.isCritical);

    cout << "\n---- Suggested Solution ----\n";

    switch(t.choice) {
        case 1:
            cout << "Restart router and check cables.\n";
            break;
        case 2:
            cout << "Check power supply and hardware connections.\n";
            break;
        case 3:
            cout << "Reinstall or update the software.\n";
            break;
        case 4:
            cout << "Reset password or contact administrator.\n";
            break;
        default:
            cout << "Invalid choice.\n";
            return 0;
    }

    cout << "Priority Level: " << t.priority << endl;

    // 🔹 NEW: Edit option
    cout << "\nDo you want to edit the ticket? (y/n): ";
    cin >> editOption;

    if(editOption == 'y' || editOption == 'Y') {
        editTicket(t);

        cout << "\n--- Updated Ticket ---\n";
        cout << "Ticket ID: " << t.id << endl;
        cout << "New Priority: " << t.priority << endl;
    }

    cout << "\nWas the issue resolved? (y/n): ";
    cin >> resolved;

    if(resolved == 'n' || resolved == 'N') {
        cout << "Status: Escalated to Level 2 Support\n";
    } else {
        cout << "Status: Ticket Closed\n";
    }

    cout << "\nThank you for using the system.\n";

    return 0;
}