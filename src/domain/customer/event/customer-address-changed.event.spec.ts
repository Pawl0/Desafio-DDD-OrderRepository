import CustomerAddressChangedEvent from "./customer-address-changed.event";
import EnviaConsoleLogHandler from "../../customer/event/handler/envia-console-log.handler";
import EventDispatcher from "../../@shared/event/event-dispatcher";

describe("Customer address changed event tests", () => {

    it("should notify all event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: "1",
            name: "Customer 1",
            address: "Customer address"
        })
        
        eventDispatcher.notify(customerAddressChangedEvent)

        expect(spyEventHandler).toHaveBeenCalled();
    });

});