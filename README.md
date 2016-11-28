#jiracmdtool

##Configuration file

###File example

```
{
  "jira": {
    "JIRACODE1": {
      "url": "https://some.jira.com",
      "code": "JIRACODE1",
      "typeOutMapping": {
        "task": "Task",
        "subtask": "Sub-task"
      },
      "username": "username",
      "password": "password"
    },
    "JIRACODE2": {
      "url": "https://someother.jira.net",
      "code": "JIRACODE2",
      "typeOutMapping": {
        "task": "Task"
      },
      "typeInMapping": {
        "Task": "task",
        "Sub-task": "task"
      },
      "username": "username",
      "password": "password"
    }
  },
  "email": {
    "options": {
      "key": "sendgrid key"
    },
    "templates": {
      "TemplateDeployUAT": {
        "from": "examplefrom@email.com",
        "to": "examplefrom@email.com",
        "subject": "Release Email",
        "body": "Good afternoon,\n\nthere will be deployment in UAT in next 15 minutes.\n\nPlease finish or suspend your work. The environment will be unavailable for 10-15 minutes.\n\nWe will notify you when release is completed.\n\nThanks for your patience\n\n"
      }
    }
  }
}
```

##Usage

###Copy ticket

```
jiracmdtool copyt -s JIRACODE2-123 -t JIRACODE2 -c config/file.json
```

###Send email

```
jiracmdtool email TemplateDeployUAT
```