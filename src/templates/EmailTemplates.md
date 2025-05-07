
# Email Notification Templates

This document outlines the structure and variables available for each type of email notification template.

## Template Structure

Each email template should include:

1. A header with the Influencer Adsense logo
2. A greeting that addresses the user by name
3. The main content of the notification
4. A call-to-action button (when applicable)
5. Footer with links to settings, help, and unsubscribe options

## Available Variables

The following variables are available for use in templates:

- `{{ user.firstName }}`: The user's first name
- `{{ user.lastName }}`: The user's last name
- `{{ user.email }}`: The user's email address
- `{{ user.role }}`: The user's role (brand, influencer, or campaigner)
- `{{ notification.title }}`: The title of the notification
- `{{ notification.message }}`: The message content of the notification
- `{{ notification.createdAt }}`: The timestamp when the notification was created
- `{{ action.url }}`: The URL for the call-to-action button
- `{{ action.text }}`: The text for the call-to-action button

## Brand Notification Templates

### New Influencer Application

```html
<h1>New Influencer Application</h1>
<p>Hi {{ user.firstName }},</p>
<p>{{ notification.message }}</p>
<p>A new influencer has applied to your campaign "{{ campaign.name }}".</p>
<p>Review their profile and make a decision.</p>
<a href="{{ action.url }}">{{ action.text }}</a>
```

### Deliverable Submitted

```html
<h1>New Deliverable Submitted</h1>
<p>Hi {{ user.firstName }},</p>
<p>{{ notification.message }}</p>
<p>An influencer has submitted a deliverable for your campaign "{{ campaign.name }}".</p>
<p>Review it now to provide feedback or approval.</p>
<a href="{{ action.url }}">{{ action.text }}</a>
```

### Campaign Approval Status

```html
<h1>Campaign Status Update</h1>
<p>Hi {{ user.firstName }},</p>
<p>{{ notification.message }}</p>
<p>Your campaign "{{ campaign.name }}" has been {{ campaign.status }}.</p>
<a href="{{ action.url }}">{{ action.text }}</a>
```

## Influencer Notification Templates

### Application Status

```html
<h1>Application Status Update</h1>
<p>Hi {{ user.firstName }},</p>
<p>{{ notification.message }}</p>
<p>Your application for the campaign "{{ campaign.name }}" has been {{ application.status }}.</p>
<a href="{{ action.url }}">{{ action.text }}</a>
```

### Matching Campaign

```html
<h1>New Campaign Match</h1>
<p>Hi {{ user.firstName }},</p>
<p>{{ notification.message }}</p>
<p>We found a new campaign that matches your interests: "{{ campaign.name }}".</p>
<p>Apply now to be considered!</p>
<a href="{{ action.url }}">{{ action.text }}</a>
```

## Campaigner Notification Templates

### New Referral Signup

```html
<h1>New Referral Signup</h1>
<p>Hi {{ user.firstName }},</p>
<p>{{ notification.message }}</p>
<p>Someone has signed up using your referral link.</p>
<p>Keep sharing to earn more points!</p>
<a href="{{ action.url }}">{{ action.text }}</a>
```

### Monthly Points Report

```html
<h1>Your Monthly Points Report</h1>
<p>Hi {{ user.firstName }},</p>
<p>{{ notification.message }}</p>
<p>Your points summary for {{ month }}:</p>
<p>- Points earned this month: {{ points.earned }}</p>
<p>- Total points: {{ points.total }}</p>
<p>- Ranking: {{ points.ranking }}</p>
<a href="{{ action.url }}">{{ action.text }}</a>
```

## Implementation Notes

1. These templates are examples and should be implemented in HTML with proper styling.
2. Email templates should be responsive and work well on mobile devices.
3. Always include an unsubscribe link in the footer.
4. Test emails across various email clients before deploying.
