package com.hms.model;

public class Patient {
    private String sno;
    private String ipNo;
    private String doa;
    private String days;
    private String name;
    private String age;
    private String gender;
    private String bed;
    private String room;
    private String referType;

    // Constructors
    public Patient() {}

    public Patient(String sno, String ipNo, String doa, String days, String name, String age, String gender, String bed, String room, String referType) {
        this.sno = sno;
        this.ipNo = ipNo;
        this.doa = doa;
        this.days = days;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.bed = bed;
        this.room = room;
        this.referType = referType;
    }

    // Getters and Setters
    public String getSno() { return sno; }
    public void setSno(String sno) { this.sno = sno; }
    public String getIpNo() { return ipNo; }
    public void setIpNo(String ipNo) { this.ipNo = ipNo; }
    public String getDoa() { return doa; }
    public void setDoa(String doa) { this.doa = doa; }
    public String getDays() { return days; }
    public void setDays(String days) { this.days = days; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAge() { return age; }
    public void setAge(String age) { this.age = age; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getBed() { return bed; }
    public void setBed(String bed) { this.bed = bed; }
    public String getRoom() { return room; }
    public void setRoom(String room) { this.room = room; }
    public String getReferType() { return referType; }
    public void setReferType(String referType) { this.referType = referType; }
}
