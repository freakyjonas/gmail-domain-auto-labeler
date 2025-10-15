# Gmail Domain Auto Labeler

Automate organizing your Gmail inbox by labeling emails based on sender domains. This Google Apps Script processes your inbox in batches, dynamically creating labels for each unique sender domain (e.g., domain_amazon_com). Perfect for managing large inboxes with tens of thousands of emails.

## Features

- Batch processes emails for efficient handling of large inboxes (20,000+ emails)
- Automatically creates and applies labels based on sender domains
- Detailed logging for monitoring progress and new labels created
- Easy setup with time-driven triggers (e.g., every 5 minutes)
- Resumes processing where it left off to avoid timeouts

## How to Use

1. Go to [Google Apps Script](https://script.google.com/) and create a new project.
2. Copy the `Code.gs` script into your project.
3. Save the project.
4. Set up a time-driven trigger for the function `autoSortGmailBySenderDomainBatch`:
   - Click the clock icon ("Triggers")
   - Add a new trigger
   - Select `autoSortGmailBySenderDomainBatch`
   - Choose "Time-driven" and set the interval (e.g., every 5 minutes)
5. Run the script manually once to authorize permissions or wait for the trigger.
6. Check logs in the Apps Script editor (View > Logs) to monitor progress.

## Notes

- The script processes only inbox threads.
- Gmail allows up to about 5,000 labels per account; use wisely.
- The script maintains its state to handle large inboxes across multiple runs.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributions & Support

Feel free to open issues or pull requests for improvements or questions.



© 2025 freakyjonas
