*** Settings ***
Library             SeleniumLibrary

*** Variables ***
${browser}          chrome
${check_url}        http://localhost:3000/login
${CorrectID}          Chanon
${CorrectPassword}    123456

*** Test Cases ***
TC_UI_00001 Profile
    Open Browser  ${check_url}  ${browser}
    Input text  id=userid-form    ${CorrectID}
    Input text    id=password-form   ${CorrectPassword}
    Click Element    id=btn-submit
    Wait Until Location Is    http://localhost:3000/home
    Click Element    id=My Profile
    Wait Until Location Is    http://localhost:3000/profile
    Page Should Contain    ${CorrectID}
    Close Browser

TC_UI_00002 Profile Click Create
    Open Browser  ${check_url}  ${browser}
    Input text  id=userid-form    ${CorrectID}
    Input text    id=password-form   ${CorrectPassword}
    Click Element    id=btn-submit
    Wait Until Location Is    http://localhost:3000/home
    Click Element    id=My Profile
    Wait Until Location Is    http://localhost:3000/profile
    Click Element    id=create-post
    Wait Until Location Is    http://localhost:3000/idea/add
    Page Should Contain    Write Your Idea
    Close Browser