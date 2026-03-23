#include <iostream>
using namespace std;

int ticketCounter = 1000;

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

int main() {
    int choice, users;
    char criticalSystem, resolved;

    ticketCounter++;

    cout << "===== HELP DESK EXPERT SYSTEM =====\n";
    cout << "Ticket ID: " << ticketCounter << endl;

    cout << "\nSelect Problem Type:\n";
    cout << "1. Network Issue\n";
    cout << "2. Hardware Issue\n";
    cout << "3. Software Issue\n";
    cout << "4. Account/Login Issue\n";
    cout << "Enter choice: ";
    cin >> choice;

    cout << "How many users are affected? ";
    cin >> users;

    cout << "Is this a critical system? (y/n): ";
    cin >> criticalSystem;

    bool isCritical = (criticalSystem == 'y' || criticalSystem == 'Y');

    string priority = assignPriority(users, isCritical);

    cout << "\n---- Suggested Solution ----\n";

    switch(choice) {
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

    cout << "Priority Level: " << priority << endl;

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