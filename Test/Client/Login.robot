*** Settings ***
Library             SeleniumLibrary

*** Variables ***
${browser}          chrome
${check_url}        http://localhost:3000/login
${CorrectID}          Chanon
${CorrectPassword}    123456
${WrongID}          Chanon123
${WrongPassword}    12345679

*** Test Cases ***
TC_UI_00001 Login
    Open Browser  ${check_url}  ${browser}
    Input text  id=userid-form    ${CorrectID}
    Input text    id=password-form   ${CorrectPassword}
    Click Element    id=btn-submit
    Wait Until Location Is    http://localhost:3000/home
    Page Should Contain    Admin Announcement
    Close Browser

TC_UI_00002 Login Username Fail
    Open Browser  ${check_url}  ${browser}
    Input text  id=userid-form    ${WrongID}
    Input text    id=password-form   ${CorrectPassword}
    Click Element    id=btn-submit
    Sleep    1s
    Page Should Contain    User not found
    Close Browser

TC_UI_00003 Login Password Fail
    Open Browser  ${check_url}  ${browser}
    Input text  id=userid-form    ${CorrectID}
    Input text    id=password-form   ${WrongPassword}
    Click Element    id=btn-submit
    Sleep    1s
    Page Should Contain    Incorrect password
    Close Browser

TC_UI_00004 Login Not Fill Fail
    Open Browser  ${check_url}  ${browser}
    Click Element    id=btn-submit
    Sleep    1s
    Page Should Contain    Please fill in all the fields
    Close Browser