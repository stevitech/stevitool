import ToastTester from "@/components/dev/ToastTester";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Select from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";
import Textarea from "@/components/ui/Textarea";
import TimeInput from "@/components/ui/TimeInput ";
import Countdown from "@/components/ui/Countdown";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Badge from "@/components/ui/Badge";
import Alert from "@/components/ui/Alert";
import Dialog from "@/components/ui/Dialog";
import Card from "@/components/ui/Card";
import ImageCarousel from "@/components/ui/ImageCarousel";

const Home = () => {
    const [enabled, setEnabled] = useState(true);
    const [time, setTime] = useState("12:00");
    const [startDate, setStartDate] = useState(null);
    const navigate = useNavigate();

    // Set target date 3 years from now
    const threeYearsLater = new Date();
    threeYearsLater.setFullYear(threeYearsLater.getFullYear() + 3);
    const [open, setOpen] = useState(false);

    return (
        <SectionWrapper>
            <p className="font-bold text-2xl">Home</p>
            <div className="space-y-2">
                <p className="font-medium text-md">Buttons</p>
                <div className="space-x-1">
                    <Button>Button</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button onClick={() => navigate(`/admin`)} variant="">
                        Admin
                    </Button>
                </div>
                <div className="space-x-1">
                    <Badge>Badges</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                </div>
                <div className="space-y-4">
                    <p className="font-medium">Dialog (modal)</p>
                    <>
                        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
                        <Dialog
                            open={open}
                            onClose={() => setOpen(false)}
                            title="Delete Item"
                            description="Are you sure you want to delete this item?"
                            size="md"
                            footer={
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button variant="destructive">Delete</Button>
                                </>
                            }
                        >
                            <p>This action cannot be undone. Please confirm.</p>
                        </Dialog>
                    </>
                </div>
                <div>
                    <p className="font-medium">Cards</p>
                    <Card shadow hover variant="muted" className="max-w-md mx-auto">
                        <h2 className="font-bold text-lg mb-2">Muted Card</h2>
                        <p>
                            This card uses the "muted" variant with hover and shadow.
                        </p>
                    </Card>
                </div>
                <div>
                    <p className="font-medium">ImageCarousels</p>
                    <div className="max-w-xl mx-auto mt-10">
                        <ImageCarousel
                            images={[
                                "/assets/examples/gallery1.jpg",
                                "/assets/examples/gallery2.jpg",
                                "/assets/examples/gallery3.jpg",
                            ]}
                            autoPlay
                            loop
                            showArrows
                            draggable
                            interval={3000}
                        />
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <p className="font-medium ">Inputs</p>
                    <div className="flex items-center gap-3">
                        <Input placeholder="Your name" />
                        <Input type="email" placeholder="Email address" />
                    </div>
                    <div>
                        <p className="font-medium">Text Area</p>
                        <Textarea placeholder="Enter Text" type="textarea" />
                    </div>
                    <div className="flex items-center space-x-1">
                        <div>
                            <p className="font-medium pb-1">Custom Time Input</p>
                            <TimeInput
                                label="Start Time"
                                value={time}
                                onChange={(val) => setTime(val)}
                            />
                        </div>
                        <div>
                            <p className="font-medium">Date</p>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Start Date"
                                className="glass-input w-full"
                                popperClassName="glass-datepicker"
                                showPopperArrow={false}
                            />
                        </div>

                        <div className="">
                            <p className="font-medium text-md">
                                Hardcoded Countdown (3 Years)
                            </p>
                            <Countdown date={threeYearsLater} className="mt-1" />
                        </div>
                    </div>
                    <p className="font-medium">File Upload</p>
                    <Input type="file" />
                    <div>
                        <p className="font-medium">Radio & Checkbox</p>
                        <Input type="checkbox" />
                        <Input type="radio" name="plan" />
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="country"
                            className="block text-sm font-medium"
                        >
                            Select your country
                        </label>
                    </div>
                    <Select id="country" defaultValue="">
                        <option value="" disabled>
                            Select country
                        </option>
                        <option value="ng">Nigeria 🇳🇬</option>
                        <option value="pl">Poland 🇵🇱</option>
                        <option value="ca">Canada 🇨🇦</option>
                    </Select>
                    <div>
                        <p className="font-medium">Toast</p>
                        <ToastTester />
                    </div>

                    <div>
                        <p className="font-medium">Alerts</p>
                        <Alert
                            variant="info"
                            title="Heads up!"
                            message="You can now add alerts like this."
                        />

                        <Alert
                            variant="success"
                            message="Form submitted successfully."
                            autoDismiss={5}
                        />

                        <Alert
                            variant="warning"
                            banner
                            title="Cookies 🍪"
                            message="We use cookies to improve your experience."
                            cookieKey="cookieConsent"
                        />

                        <Alert
                            variant="error"
                            title="Oops!"
                            message="Something went wrong."
                            icon={null} // disables icon completely
                        />

                        <Alert
                            className="w-56"
                            variant="success"
                            title="Success"
                            message="Profile updated."
                            fullWidth={false}
                            centered
                        />
                        <p className="font-medium">full width support</p>
                        <Alert
                            variant="error"
                            title="Something went wrong"
                            message="Try again later."
                            dismissible={true}
                        />
                        <p className="font-medium">Auto Dismiss</p>
                        <Alert
                            variant="success"
                            title="Saved"
                            message="Your preferences have been updated."
                            autoDismiss={5}
                        />
                        <p className="font-medium">Bottom Banner</p>
                        <Alert
                            variant="info"
                            message="We use cookies to improve your experience. By using this site, you agree to our cookie policy."
                            banner
                            dismissible
                        />
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <label htmlFor="notifications" className="text-sm font-medium">
                        Enable notifications
                    </label>
                    <Switch checked={enabled} onChange={setEnabled} />
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Home;
